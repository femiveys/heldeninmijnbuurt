import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Widget } from "../../components/Widget";
import { ScreenLoading } from "../../components/ScreenLoading";
import { useAuth } from "../../store/auth";
import { useUser } from "../../store/user";

export default function PageDashboard() {
  const router = useRouter();
  const { isLoggedIn, loggingIn } = useAuth();
  const { refreshUser, fetchingUser } = useUser();

  useEffect(() => {
    if (!loggingIn && !isLoggedIn) {
      router.replace("/");
    }
  }, [isLoggedIn, loggingIn]);

  useEffect(() => {
    if (isLoggedIn) {
      refreshUser();
    }
  }, [isLoggedIn, refreshUser]);

  if (!isLoggedIn || fetchingUser) return <ScreenLoading />;

  return (
    <div className="row" id="page--dashboard">
      <div className="col-12 col-md-6 col-lg-6">
        <Widget
          title="Algemeen"
          fields={[
            { name: "id", label: "User ID", disabled: true },
            { name: "streetId", label: "Straat ID" },
            { name: "whatsapp", label: "Whatsapp" },
          ]}
        />
      </div>

      <div className="col-12 col-md-6 col-lg-6">
        <Widget
          title="Ik heb mondmasker nodig"
          toggleField={{
            name: "is_requestor",
          }}
          fields={[
            {
              name: "num_requested",
              type: "number",
              label: "Hoeveel mondmaskers heb je nodig?",
            },
          ]}
        />
        <Widget
          title="Ik heb een naaimachine"
          toggleField={{
            name: "is_maker",
          }}
          fields={[
            {
              name: "stock_amount",
              type: "number",
              label: "Aantal mondmaskers (stock)",
            },
          ]}
        />
        <Widget
          title="Ik heb materiaal"
          toggleField={{
            name: "has_material",
          }}
          fields={[
            {
              name: "materials",
              type: "text",
              label: "Welk materiaal bied je aan?",
            },
          ]}
        />
      </div>
    </div>
  );
}
