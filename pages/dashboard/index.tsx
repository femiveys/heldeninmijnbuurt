import React from "react";
import { useStoreon } from "storeon/react";
import { Widget } from "../../components/Widget";
import { ScreenLoading } from "../../components/ScreenLoading";

export default function PageDashboard() {
  const { user } = useStoreon("user");
  if (!user) return <ScreenLoading />;

  return (
    <div className="row" id="page--dashboard">
      <div className="col-12 col-md-6 col-lg-6">
        <Widget
          title="Algemeen"
          fields={[
            { name: "user_id", label: "User ID", disabled: true },
            { name: "street", label: "Straat" },
            { name: "zipcode", label: "Postcode" },
            { name: "whatsapp", label: "Whatsapp" },
          ]}
        />
      </div>

      <div className="col-12 col-md-6 col-lg-6">
        <Widget
          title="Ik heb mondmasker nodig"
          toggleField={{
            name: "needs_mouthmask",
          }}
          fields={[
            {
              name: "needs_mouthmask_amount",
              type: "number",
              label: "Hoeveel mondmaskers heb je nodig?",
            },
          ]}
        />
        <Widget
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
