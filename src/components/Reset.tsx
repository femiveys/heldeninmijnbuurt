import { Button, Alert } from "antd";
import { useApi, useUser, useGoto } from "../hooks";

const Reset = () => {
  const goto = useGoto();
  const { user } = useUser();
  const { isLoading: isResetting, callApi: reset } = useApi("PUT", "me/action");

  return user?.isTester ? (
    <Alert
      closable
      type="warning"
      message="Jij bent geregistreerd als een test gebruiker"
      style={{ marginTop: 16 }}
      description={
        <div>
          <div>
            Om het testen te vereenvoudigen, kan je je gebruiker resetten om
            helemaal opnieuw te kunnen beginnen en andere combinaties uit te
            proberen.
          </div>
          <div style={{ textAlign: "right" }}>
            <Button
              loading={isResetting}
              type="primary"
              size="small"
              onClick={async () => {
                await reset({ name: "reset" });
                goto();
              }}
            >
              Reset je gebruiker
            </Button>
          </div>
        </div>
      }
    />
  ) : null;
};

export default Reset;
