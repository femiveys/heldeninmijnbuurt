import { LoadScript, GoogleMap } from "@react-google-maps/api";
import React from "react";
import { useUser } from "../hooks";

const AdminDashboard = (props: any) => {
  const { user } = useUser();

  console.log(user);

  const { containerStyle, center } = props;
  return (
    <LoadScript googleMapsApiKey="AIzaSyCqIc4I1VqszrnaLa2k2sS3KpietA2smmo">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {/* Child components, such as markers, info windows, etc. */}
      </GoogleMap>
    </LoadScript>
  );
};

export default AdminDashboard;
