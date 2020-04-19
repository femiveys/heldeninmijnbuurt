import Link from "next/link";
import { useStoreon } from "storeon/react";
import { LogoutButton } from "../components/buttons/LogoutButton";
import { UserAvatar } from "./UserAvatar";
import { Spinner } from "./Spinner";
import { useAuth } from "../store/auth";

export const MainNavigation = () => {
  const { user, checkingUser, fetchingUser } = useStoreon(
    "user",
    "checkingUser",
    "fetchingUser"
  );

  return (
    <div style={{ background: "#fff" }}>
      <div id="nav" className=" sticky-top">
        <div className="container">
          <div className="navbar navbar-expand-lg border-bottom">
            <a
              className="navbar-toggler mr-1"
              href=""
              data-id="menu-1-sidebar-toggle"
            >
              <img src="/assets/glyphs/burger.svg" />
            </a>
            <div className="mr-4 weight-700">
              <Link href="/">
                <a>Mijn mondmasker 😷</a>
              </Link>
            </div>
            <div className="navbar-collapse weight-700">
              <div className="navbar-nav">
                {/* <div className="nav-item">
                  <a className="nav-link text-dark" href="#build">
                    Word superheld
                  </a>
                </div>
                <div className="nav-item">
                  <a className="nav-link text-dark" href="#request">
                    Vraag aan
                  </a>
                </div>
                <div className="nav-item">
                  <a className="nav-link text-dark" href="#sources">
                    Artikels
                  </a>
                </div> */}
              </div>
            </div>
            {user && <LogoutButton />}
            <div className="ml-auto d-none d-lg-block">
              <ActionButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActionButton = () => {
  const { isLoggedIn, loggingIn, firebaseUser } = useAuth();

  if (loggingIn) return <Spinner color="blue" />;

  if (isLoggedIn) {
    return (
      <Link href="/dashboard">
        <span className="btn btn-primary pulse" style={{ marginLeft: 10 }}>
          Dashboard
          <UserAvatar
            style={{ marginLeft: 10 }}
            imageUrl={firebaseUser?.photoURL}
          />
        </span>
      </Link>
    );
  }

  return (
    <Link href="/">
      <span className="btn btn-primary pulse">
        Word superheld!
        <img
          src="/assets/glyphs/sewing-machine.svg"
          width="24"
          style={{ marginLeft: 10 }}
        />
      </span>
    </Link>
  );
};
