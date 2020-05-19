import { Button, Alert } from "antd";
import { useRouter } from "next/router";
import { useApi, useUser } from "../../hooks";
import { useTranslation } from "react-i18next";

const Undisguise = () => {
  const router = useRouter();
  const { user } = useUser();
  const { t } = useTranslation();
  const { isLoading: isUndisguising, callApi: undisguise } = useApi(
    "PUT",
    "requestor/action"
  );

  return user.realUserId !== user.userId ? (
    <Alert
      closable
      type="warning"
      style={{ textAlign: "left" }}
      message={t("maker.undisguise.message")}
      description={
        <div>
          <div>
            {t("maker.undisguise.par1")}
            <br />
            {t("maker.undisguise.par2")}
          </div>
          <div style={{ textAlign: "right" }}>
            <Button
              loading={isUndisguising}
              type="primary"
              size="small"
              onClick={async () => {
                await undisguise({ name: "undisguise" });
                router.reload();
              }}
            >
              {t("maker.undisguise.label")}
            </Button>
          </div>
        </div>
      }
    />
  ) : null;
};

export default Undisguise;
