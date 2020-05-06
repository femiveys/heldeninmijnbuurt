import { Button, Alert } from "antd";
import { useApi, useUser, useGoto } from "../../hooks";

const Disguise = () => {
  const goto = useGoto();
  const { user } = useUser();
  const { isLoading: isDisguising, callApi: disguise } = useApi(
    "PUT",
    "requestor/action"
  );

  return user?.isTester ? (
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
                goto();
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
