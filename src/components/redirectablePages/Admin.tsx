import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import FullSpinner from "../FullSpinner";
import { useUser, useGoto } from "../../hooks";
import AdminDashboard from "../admin/AdminDashboard";

export default () => {
  const goto = useGoto();
  const { user } = useUser();
  const { t } = useTranslation();

  useEffect(() => {
    if (!user.isAdmin) goto();
  }, [user]);

  // We show a FullSpinner while redirecting
  return !user.isAdmin ? (
    <FullSpinner tip={t("redirect.noAdmin")} />
  ) : (
    <AdminDashboard />
  );
};
