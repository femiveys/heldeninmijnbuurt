import {
  LoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { useApi } from "../../hooks";
import { TUser } from "../../types";
import Popup from "./Popup";
import { calculateCenter, getIcon, getPosition } from "./helpers";

const containerStyle = {
  height: "400px",
  width: "800px",
};

const AdminDashboard = () => {
  const { data: users, callApi } = useApi<TUser[]>("GET", "admin/users", []);
  const [isClickedIndex, setIsClickedIndex] = useState<number>();

  useEffect(() => {
    callApi();
  }, []);

  if (!users) return null;

  return (
    <LoadScript googleMapsApiKey="AIzaSyDM5zDMhdVc6BfXOJz5ad_O8Ov6lRIs0bc">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={calculateCenter(users)}
        zoom={8}
      >
        {users.map((user, index) => (
          <Marker
            key={user.userId}
            icon={getIcon(user)}
            onClick={() => setIsClickedIndex(index)}
            position={getPosition(user)}
          />
        ))}
        {users
          .filter((_, index) => index === isClickedIndex)
          .map((user) => (
            <InfoWindow key={user.userId} position={getPosition(user)}>
              <Popup user={user} />
            </InfoWindow>
          ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default AdminDashboard;
