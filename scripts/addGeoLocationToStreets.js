#!/usr/bin/env node
const mysql = require("mysql");
const http = require("http");

// Helpers
const removeParentheses = (street) => street.replace(/ *\([^)]*\) */g, "");

const parseAddress = (street) => {
  const streetName = removeParentheses(
    street.street_desc_nl || street.street_desc_fr || street.street_desc_de
  );

  const city =
    street.municipality_desc_nl ||
    street.municipality_desc_fr ||
    street.municipality_desc_de;

  return `${streetName}, ${street.postal_code} ${city}`;
};

const getAddressComponents = (street) => ({
  postalCode: street.postal_code,
  city: encodeURIComponent(
    street.municipality_desc_fr ||
      street.municipality_desc_de ||
      street.municipality_desc_nl
  ),
  streetName: encodeURIComponent(
    removeParentheses(
      street.street_desc_fr || street.street_desc_de || street.street_desc_nl
    )
  ),
});

// Taken from: https://www.bram.us/2012/03/14/convert-lambert72-to-wgs84/
const lambert72toWGS84 = (x, y) => {
  const n = 0.77164219;
  const F = 1.81329763;
  const thetaFudge = 0.00014204;
  const e = 0.08199189;
  const a = 6378388;
  const xDiff = 149910;
  const yDiff = 5400150;
  const theta0 = 0.07604294;

  const xReal = xDiff - x;
  const yReal = yDiff - y;

  const rho = Math.sqrt(xReal * xReal + yReal * yReal);
  const theta = Math.atan(xReal / -yReal);

  const newLongitude = ((theta0 + (theta + thetaFudge) / n) * 180) / Math.PI;
  let newLatitude = 0;

  for (var i = 0; i < 5; ++i) {
    newLatitude =
      2 *
        Math.atan(
          Math.pow((F * a) / rho, 1 / n) *
            Math.pow(
              (1 + e * Math.sin(newLatitude)) / (1 - e * Math.sin(newLatitude)),
              e / 2
            )
        ) -
      Math.PI / 2;
  }
  newLatitude *= 180 / Math.PI;
  return [newLatitude, newLongitude];
};

const handleChunks = (resolve) => (response) => {
  let data = "";

  response.on("data", (chunk) => {
    data += chunk;
  });

  response.on("end", () => {
    resolve(JSON.parse(data));
  });
};

const getLonLat = async (street) => {
  const address = parseAddress(street);
  const flemishGeoLocationData = await getFlemishGeoLocationData(address);
  const flemishLocationResult = flemishGeoLocationData.LocationResult[0];

  // If the geolocation service cannot geolocate the address in Flanders,
  // we try lo geolocate it in Wallonia, if this still doesn't work,
  // we set the geolocation to 0,0 for furter exclusion and so they are not
  // requested again when the script runs again
  let lonlat = "0 0";
  if (flemishLocationResult && flemishLocationResult.Location) {
    lonlat = `${flemishLocationResult.Location.Lon_WGS84} ${flemishLocationResult.Location.Lat_WGS84}`;
  } else {
    const { x, y } = await getWaloonGeoLocationData(street);
    if (x && y) {
      const [lat, lon] = lambert72toWGS84(x, y);
      lonlat = `${lon} ${lat}`;
    }
  }
  return lonlat;
};

const getFlemishGeoLocationData = (address) =>
  new Promise((resolve, reject) => {
    http
      .get(
        `http://loc.geopunt.be/geolocation/location?q=${encodeURIComponent(
          address
        )}`,
        handleChunks(resolve)
      )
      .on("error", (err) => {
        reject(err);
      });
  });

const getWaloonGeoLocationData = (street) => {
  const { postalCode, city, streetName } = getAddressComponents(street);

  const prefix =
    "http://geoservices.wallonie.be/geolocalisation/rest/getPositionByCpAndRue";

  return new Promise((resolve, reject) => {
    http
      .get(`${prefix}/${postalCode}/${streetName}`, handleChunks(resolve))
      .on("error", (err) => {
        reject(err);
      });
  });
};

const logStreet = (street, message) =>
  console.log(message, street.id, parseAddress(street));

const setGeoLocation = async (selectResult, index) => {
  const street = selectResult[index];

  try {
    const lonlat = await getLonLat(street);

    const sql =
      `UPDATE streets ` +
      `SET geolocation=ST_GeomFromText('POINT(${lonlat})', 4326) ` +
      `WHERE id=${street.id}`;

    connection.query(sql, (insertErr) => {
      logStreet(
        street,
        lonlat === "0 0" ? "Unable to geolocate:" : "Set geolocation for:"
      );
      if (index === selectResult.length - 1) connection.end();
      if (insertErr) throw insertErr;
    });
  } catch (err) {
    logStreet(street, "There was an error while trying to geolocate:");
    console.log(err);
  }
};

// Define the connection
const connection = mysql.createConnection({
  host: "ID179346_mondmaskers.db.webhosting.be",
  user: "ID179346_mondmaskers",
  password: "CpJuxxtgy2P49aLu",
  database: "ID179346_mondmaskers",
});

// Connect to the DB
connection.connect((connectionError) => {
  if (connectionError) throw connectionError;

  const sql = "SELECT * from streets WHERE geolocation is NULL";

  connection.query(sql, async (selectErr, selectResult) => {
    if (selectErr) throw selectErr;

    if (selectResult.length === 0) connection.end();

    console.log("Query executed:", sql, selectResult.length);

    for (let index = 0; index < selectResult.length; index++) {
      await setGeoLocation(selectResult, index);
    }
  });
});
