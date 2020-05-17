import { TUser } from "../../types";
import getCenterOfBounds from "geolib/es/getCenterOfBounds";

export const calculateCenter = (users: TUser[]) => {
  const empty = { lat: 50.8503463, lng: 4.3517211 };

  if (users.length === 0) {
    return empty;
  } else {
    const center = getCenterOfBounds(
      users.map((user) => ({
        latitude: user.geolocation.y,
        longitude: user.geolocation.x,
      }))
    );

    return center ? { lat: center.latitude, lng: center.longitude } : empty;
  }
};

export const getIcon = (user: TUser) =>
  `https://maps.google.com/mapfiles/ms/icons/${
    user.isMaker ? "red" : "yellow"
  }-dot.png`;

export const getPosition = (user: TUser) => ({
  lat: user.geolocation.y,
  lng: user.geolocation.x,
});
