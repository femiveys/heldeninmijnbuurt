import Link from "next/link";
import { LogoutButton } from "../components/buttons/LogoutButton";
import { DashboardButton } from "../components/buttons/DashboardButton";
import { useAuth } from "../store/auth";

export const MainNavigation = () => {
  const { isLoggedIn } = useAuth();

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
                <a>Helden van de buurt 😷</a>
              </Link>
            </div>
            <div style={{ flex: 1 }} />
            {isLoggedIn && <LogoutButton />}
            <div className="ml-auto d-none d-lg-block">
              <DashboardButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
