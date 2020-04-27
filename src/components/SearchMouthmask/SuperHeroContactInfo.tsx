import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Card, Space, Spin, Typography } from "antd";

import {
  MailOutlined,
  UserOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { TRelationUser } from "../../types";
import { useApi } from "../../hooks";

const { Paragraph } = Typography;

export const SuperHeroContactInfo = () => {
  const { t } = useTranslation();
  const {
    isLoading: isFetchingSuperHero,
    data: relationUser,
    error,
    callApi: fetchSuperHero,
  } = useApi<TRelationUser>("GET", "requestor/superHero");
  useEffect(() => {
    fetchSuperHero();
  }, []);

  return relationUser?.user ? (
    <Space>
      <Card title="Jouw superheld">
        <Space size="large" direction="vertical">
          <Space>
            <UserOutlined style={{ fontSize: 32 }} />
            {relationUser.user.name}
          </Space>
          <Space>
            <MailOutlined style={{ fontSize: 32 }} />
            <a href={`mailto:${relationUser.user.email}`} target="_blank">
              {relationUser.user.email}
            </a>
          </Space>
          {relationUser.user.whatsapp && (
            <Space>
              <WhatsAppOutlined style={{ fontSize: 32 }} />
              {`+32${relationUser.user.whatsapp}`}
            </Space>
          )}
        </Space>
      </Card>
      <Paragraph>Some info on how to get in contact ...</Paragraph>
    </Space>
  ) : isFetchingSuperHero ? (
    <Spin tip={t("requestor.contact.loading")} />
  ) : (
    <div>
      <p>
        We hebben jammergenoeg niemand in je buurt gevonden die maskers heeft.
        We blijven zoeken en zullen je een e-mail sturen zodra we iemand vinden.
      </p>
      <p>
        Laat op sociale media weten van deze applicatie. Misschien vinden we zo
        wel iemand.
      </p>
      <p>Knoppen en zo...</p>
    </div>
  );
};
