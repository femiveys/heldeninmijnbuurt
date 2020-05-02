import { useEffect, useCallback, useState } from "react";
import { Table, Typography, Button, Modal, Divider } from "antd";
import { CloseOutlined, DownloadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { formatLengthDistance } from "../../helpers";
import { apiCall } from "../../axios";
import { useUser } from "../../hooks";
import { TRequestedRequest } from "../../types";

const { Paragraph } = Typography;
const { Column } = Table;

type TRecord = TRequestedRequest & { key: number };

type TProps = {
  requests: TRequestedRequest[];
  fetchAccepted: () => Promise<void>;
  fetchRequested: () => Promise<void>;
};

export const RequestedRequests = ({
  requests,
  fetchAccepted,
  fetchRequested,
}: TProps) => {
  const { t } = useTranslation();
  const { user, updateUser } = useUser();
  const [data, setData] = useState(requests);

  // Update the state when the requests change
  useEffect(() => {
    setData(requests);
  }, [requests]);

  const acceptOrDecline = (action: "accept" | "decline") => (
    relationId: number,
    needsMouthmaskAmount?: number
  ) => async () => {
    // We do an optimistic update on the current table
    setData(data.filter((row) => row.relationId !== relationId));

    // We do an optimistic update on the user. This will only be done
    // if it's an accept because of passing needsMouthmaskAmount
    if (needsMouthmaskAmount && user) {
      updateUser({ maskStock: user.maskStock - needsMouthmaskAmount });
    }

    try {
      if (await apiCall("PUT", `superhero/${action}/${relationId}`)) {
        await fetchAccepted();
        await fetchRequested();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const accept = useCallback(acceptOrDecline("accept"), [data, user]);
  const decline = useCallback(acceptOrDecline("decline"), [data, user]);

  const dataWithKeys =
    data && data.length > 0
      ? data.map((record) => ({ key: record.relationId, ...record }))
      : [];

  return dataWithKeys.length > 0 ? (
    <div style={{ marginBottom: 32 }}>
      <Divider orientation="left">{t("maker.requested.title")}</Divider>
      <Table size="small" dataSource={dataWithKeys} pagination={false}>
        <Column
          key="needsMouthmaskAmount"
          title={t("needsMouthmaskAmount")}
          dataIndex="needsMouthmaskAmount"
          align="center"
        />
        <Column
          key="distance"
          title={t("maker.requested.distance")}
          dataIndex="distance"
          align="right"
          render={(distance) => formatLengthDistance(distance)}
        />
        <Column<TRecord>
          key="accept"
          title={t("maker.requested.ableToHelp")}
          dataIndex="relationId"
          colSpan={2}
          align="center"
          render={(relationId, record) => (
            <Button
              type="primary"
              size="small"
              icon={<DownloadOutlined />}
              onClick={() => {
                if (Number(user?.maskStock) < record.needsMouthmaskAmount) {
                  Modal.warning({
                    title: "Je hebt onvoldoende mondmaskers",
                    content: (
                      <Typography>
                        <Paragraph>
                          {t("maker.requested.stock", {
                            count: user?.maskStock,
                          })}{" "}
                          Dit is minder dan in deze aanvraag.
                        </Paragraph>
                        <Paragraph>
                          Gelieve je stock aan te passen voor je deze aanvraag
                          kan aanvaarden.
                        </Paragraph>
                      </Typography>
                    ),
                  });
                } else {
                  accept(relationId, record.needsMouthmaskAmount)();
                }
              }}
            >
              {t("yes")}
            </Button>
          )}
        />
        <Column
          key="decline"
          dataIndex="relationId"
          colSpan={0}
          align="center"
          render={(relationId) => (
            <Button
              danger
              type="primary"
              size="small"
              icon={<CloseOutlined />}
              onClick={() => {
                Modal.confirm({
                  title: "Ben je zeker dat je deze maskers niet kan naaien?",
                  content: (
                    <Typography>
                      <Paragraph>
                        Spijtig, maar de aanvrager zal in ieder geval niet weten
                        dat jij de maskers niet kon naaien. Wij zoeken voor hem
                        of haar een nieuwe superheld. Zo kan jij op je beide
                        oren slapen.
                      </Paragraph>
                    </Typography>
                  ),
                  okText: "Ja, ik ben zeker",
                  cancelText: "Nee, ik twijfel toch",
                  onOk: decline(relationId),
                });
              }}
            >
              {t("no")}
            </Button>
          )}
        />
      </Table>
    </div>
  ) : null;
};
