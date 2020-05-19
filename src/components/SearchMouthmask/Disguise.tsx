import { Button, Alert } from "antd";
import { Trans } from "react-i18next";
import { useRouter } from "next/router";
import { useApi, useUser } from "../../hooks";
import { EUserStatus } from "../../types";

const Disguise = () => {
  const router = useRouter();
  const { user } = useUser();
  const { isLoading: isDisguising, callApi: disguise } = useApi(
    "PUT",
    "requestor/action"
  );

  return user.isTester && user.status !== EUserStatus.done ? (
    <Alert
      closable
      type="warning"
      message={<Trans i18nKey="requestor.disguise.message" />}
      description={
        <>
          <div>
            <Trans i18nKey="requestor.disguise.par1" />
          </div>
          <div style={{ textAlign: "right" }}>
            <Button
              loading={isDisguising}
              type="primary"
              size="small"
              onClick={async () => {
                await disguise({ name: "disguise" });
                router.reload();
              }}
            >
              <Trans i18nKey="requestor.disguise.label" />
            </Button>
          </div>
        </>
      }
    />
  ) : null;
};

export default Disguise;
