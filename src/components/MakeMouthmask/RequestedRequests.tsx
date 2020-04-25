import { Table, Spin, Space, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { ColumnProps } from "antd/es/table";
import { TRequestedRequest } from "../../types";
import { useEffect } from "react";
import { useApi } from "../../hooks";

const { Title } = Typography;

export const RequestedRequests = () => {
  const { t } = useTranslation();
  const { isLoading, callApi, data } = useApi<TRequestedRequest[]>(
    "GET",
    "superHero/requestedRequests",
    []
  );

  useEffect(() => {
    callApi();
  }, []);

  const columns: ColumnProps<TRequestedRequest>[] = [
    {
      title: t("name"),
      dataIndex: "name",
    },
    {
      title: t("needsMouthmaskAmount"),
      dataIndex: "needsMouthmaskAmount",
    },
    {
      title: t("distance"),
      dataIndex: "distance",
    },
    // {
    //   key: "action",
    //   render: (text, record) => (
    //     <span>
    //       <a style={{ marginRight: 16 }}>Invite {record.name}</a>
    //       <a>Delete</a>
    //     </span>
    //   ),
    // },
  ];

  return isLoading ? (
    <Spin />
  ) : data.length > 0 ? (
    <Space direction="vertical">
      <Title level={4}>{t("maker.requested")}</Title>
      <Table columns={columns} dataSource={data} />
    </Space>
  ) : null;
};
