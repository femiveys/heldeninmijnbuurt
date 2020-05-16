import { useEffect } from "react";
import FullSpinner from "../FullSpinner";
import { useUser, useGoto } from "../../hooks";
import AdminDashboard from "../AdminDashboard";

export default () => {
  const goto = useGoto();
  const { user } = useUser();

  useEffect(() => {
    if (!user.isAdmin) goto();
  }, [user]);

  // We show a FullSpinner while redirecting
  return !user.isAdmin ? (
    <FullSpinner tip="Je bent geen administrator" />
  ) : (
    <AdminDashboard />
  );
};
