import { Button, Alert } from "antd";
import { useApi, useUser, useAuth } from "../../hooks";
import { useRouter } from "next/router";

const Undisguise = () => {
  const router = useRouter();
  const { user } = useUser();
  const { firebaseUser } = useAuth();
  const { isLoading: isUndisguising, callApi: undisguise } = useApi(
    "PUT",
    "requestor/action"
  );

  return firebaseUser && user && firebaseUser.uid !== user.userId ? (
    <Alert
      type="warning"
      closable
      style={{ textAlign: "left" }}
      message="Jij bent geregistreerd als een test gebruiker"
      description={
        <div>
          <div>
            Momenteel ben je vermomd als je superheld.
            <br />
            Dit kan je zien door rechtsboven op je avatar te klikken
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
              Maak vermomming ongedaan
            </Button>
          </div>
        </div>
      }
    />
  ) : null;
};

export default Undisguise;
