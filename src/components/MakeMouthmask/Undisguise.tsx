import { User } from "firebase/app";
import { Button, Alert } from "antd";
import { useApi, useUser, useAuth } from "../../hooks";
import { useRouter } from "next/router";

const getUserIdFromFirebaseUser = (firebaseUser: User) => {
  const googleProviders = firebaseUser.providerData.filter(
    (provider) => provider && provider.providerId === "google.com"
  );
  const googleProvider = googleProviders[0];
  return googleProvider ? googleProvider.uid : null;
};

const Undisguise = () => {
  const router = useRouter();
  const { user } = useUser();
  const { firebaseUser } = useAuth();
  const { isLoading: isUndisguising, callApi: undisguise } = useApi(
    "PUT",
    "requestor/action"
  );

  return firebaseUser &&
    user &&
    getUserIdFromFirebaseUser(firebaseUser) !== user.userId ? (
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
