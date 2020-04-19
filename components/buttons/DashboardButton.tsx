import React from "react";
import Link from "next/link";
import { useAuth } from "../../store/auth";
import { Spinner } from "../Spinner";
import { UserAvatar } from "../UserAvatar";

export const DashboardButton = () => {
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
