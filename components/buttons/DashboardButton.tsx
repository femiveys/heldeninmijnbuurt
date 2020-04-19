import React from "react";
import Link from "next/link";
import { Spinner } from "../Spinner";
import { UserAvatar } from "../UserAvatar";
import { useAuth } from "../../base/auth";
import { useUser } from "../../base/user";

export const DashboardButton = () => {
  const { isLoggedIn, loggingIn, firebaseUser } = useAuth();
  const { user, fetchingUser } = useUser();

  if (loggingIn) return <Spinner color="blue" />;

  if (!fetchingUser && !user && firebaseUser) {
    return (
      <Link href="/dashboard">
        <span className="btn btn-primary pulse" style={{ marginLeft: 10 }}>
          Vervolledig profiel
          <UserAvatar
            style={{ marginLeft: 10 }}
            imageUrl={firebaseUser?.photoURL}
          />
        </span>
      </Link>
    );
  }

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
