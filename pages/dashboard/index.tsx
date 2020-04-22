import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { ScreenLoading } from "../../components/ScreenLoading";
import { useUser } from "../../base/user";
import { useAuth } from "../../base/auth";
import { useSmartForm } from "../../components/SmartForm/useSmartForm";
import { WidgetNeedMouthmask } from "./WidgetNeedMouthmask";
import { SmartFormField } from "../../components/SmartForm/SmartFormField";
import { DropdownCity } from "../../components/dropdowns/DropdownCity";
import { fetchIP } from "../../base/user/fetchIP";
import { DebugData } from "../../components/DebugData";
import { DropdownStreet } from "../../components/dropdowns/DropdownStreet";
import { BaseButton } from "../../components/buttons/BaseButton";
import { message } from "antd";
import { apiCall } from "../../axios";
import { store } from "../../store";

export default function PageDashboard() {
  const router = useRouter();
  const { isLoggedIn, loggingIn } = useAuth();
  const { refreshUser, fetchingUser, user } = useUser();
  const generalForm = useSmartForm();

  useEffect(() => {
    fetchIP()
      .then(({ postalCode }) => {
        generalForm.setValue("postal_code", postalCode);
      })
      .catch((error) => {
        // ...
      });
  }, []);

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

  if (!fetchingUser && !user) {
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
        <DebugData data={generalForm.values} />
        <SmartFormField
          form={generalForm}
          name="postal_code"
          label="Stad"
          render={({ value, setValue }) => {
            return (
              <DropdownCity
                value={value}
                onChange={(_value) => {
                  generalForm.setValue("street_id", undefined);
                  setValue(_value);
                }}
              />
            );
          }}
        />
        <SmartFormField
          form={generalForm}
          name="street_id"
          label="Straat"
          render={({ value, setValue, form }) => {
            return (
              <DropdownStreet
                postalCode={form.values?.["postal_code"]}
                value={value}
                onChange={setValue}
              />
            );
          }}
        />
        <BaseButton
          primary
          large
          text="Volgende"
          onClick={async () => {
            try {
              // Register
              const me = await apiCall(
                "POST",
                "/me",
                generalForm.collectValues()
              );
              message.success("Profiel aangemaakt!");
              store.dispatch("user/setUser", me);
            } catch (error) {
              message.error("Er ging iets fout. Probeer ns opnieuw");
            }
          }}
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
