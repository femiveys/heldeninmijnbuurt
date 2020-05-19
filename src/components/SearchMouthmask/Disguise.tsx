import { Button, Alert } from "antd";
import { useApi, useUser } from "../../hooks";
import { useRouter } from "next/router";
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
      type="warning"
      closable
      message="Jij bent geregistreerd als een test gebruiker"
      description={
        <div>
          <div>
            Om het testen te vereenvoudigen, kan je jezelf vemommen als je
            superheld.
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
              Vermom je
            </Button>
          </div>
        </div>
      }
    />
  ) : null;
};

export default Disguise;
