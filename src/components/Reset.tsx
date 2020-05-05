import { Button, Alert } from "antd";
import { useRouter } from "next/router";
import { useApi, useUser } from "../hooks";

const Reset = () => {
  const router = useRouter();
  const { user } = useUser();
  const { isLoading: isResetting, callApi: reset } = useApi("PUT", "me/action");

  return user?.isTester ? (
    <Alert
      type="warning"
      closable
      message="Jij bent geregistreerd als een test gebruiker"
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
                router.reload();
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
