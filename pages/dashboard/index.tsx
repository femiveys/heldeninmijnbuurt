import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Widget } from "../../components/Widget";
import { ScreenLoading } from "../../components/ScreenLoading";
import { useUser } from "../../base/user";
import { useAuth } from "../../base/auth";
import { SmartForm } from "../../components/SmartForm";
import { useSmartForm } from "../../components/SmartForm/useSmartForm";
import { apiCall } from "../../axios";
import { message } from "antd";
import { store } from "../../store";
import { WidgetNeedMouthmask } from "./WidgetNeedMouthmask";

export default function PageDashboard() {
  const router = useRouter();
  const { isLoggedIn, loggingIn } = useAuth();
  const { refreshUser, fetchingUser, user } = useUser();
  const generalForm = useSmartForm(user);

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

  if (!fetchingUser && user === null) {
    return (
      <div style={{ maxWidth: 400 }}>
        <h2>
          Bijna klaar!
          <br />
          We hebben nog enkele persoonlijke gegevens van jou nodig.
        </h2>
        <p>
          Deze gegevens worden anoniem opgeslagen en bewaren alle privacy van
          elke gebruiker. We brengen jou pas in contact met iemand in de buurt
          eenmaal het systeem ziet dat jij iets kan bieden of nodig hebt.
        </p>
        <SmartForm
          form={generalForm}
          fields={[
            { name: "street", label: "Straat" },
            { name: "zipcode", label: "Postcode" },
            { name: "whatsapp", label: "Whatsapp" },
          ]}
          submitButton={{
            text: "Volgende",
          }}
          onSubmit={async (values) => {
            try {
              const me = await apiCall("POST", "me", values);
              message.success("Jouw profiel werd goed opgeslagen!");
              store.dispatch("user/setUser", me);
            } catch (error) {
              message.error(`Er ging iets fout.. Probeer 'ns opnieuw?`);
            }
          }}
          shout={false}
        />
      </div>
    );
  }

  return (
    <>
      <h2>Dashboard</h2>
      <p style={{ maxWidth: 400 }}>
        Selecteer wat van toepassing is voor jou. Kom elke dag deze gegevens
        onderhouden. Zo zetten we samen een stap richting ideale wereld.
      </p>
      <div className="row" id="page--dashboard" style={{ marginBottom: 999 }}>
        <div className="col-12 col-md-6 col-lg-6">
          <WidgetNeedMouthmask />
        </div>
        <div className="col-12 col-md-6 col-lg-6">
          {/* <Widget
            title="Ik heb een naaimachine"
            toggleField={{
              name: "has_sewing_machine",
            }}
            fields={[
              {
                name: "mouthmask_stock",
                type: "number",
                label: "Aantal mondmaskers (stock)",
              },
            ]}
          /> */}
        </div>
      </div>
    </>
  );
}
