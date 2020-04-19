import { LoginGoogleButton } from "../../components/buttons/LoginGoogleButton";
import { LoginFacebookButton } from "../../components/buttons/LoginFacebookButton";
import { DashboardButton } from "../../components/buttons/DashboardButton";
import { useAuth } from "../../base/auth";

export default function InfoHeader() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="py-5">
      <div className="row justify-content-center text-center mb-4">
        <div className="col-12 col-md-8 col-lg-8">
          <h1>
            Mondmaskers zijn levensredders! Pakt uw naaimachine en word een
            superheld in jouw stad.
          </h1>
          <p className="lead">
            We hebben jullie allemaal heel hard nodig. Elke held met naaimachine
            kan mondmaskers maken voor de mensen rond zich. Zo is er geen
            verzending nodig en kunnen we efficiënt te werk gaan.
          </p>
        </div>
      </div>
      <div className="row justify-content-center text-center mb-4">
        {isLoggedIn ? (
          <DashboardButton />
        ) : (
          <>
            <LoginGoogleButton
              style={{
                marginRight: 5,
                background: "#D2462F",
                borderColor: "#D2462F",
              }}
            />
            <LoginFacebookButton />
          </>
        )}
      </div>
    </div>
  );
}
