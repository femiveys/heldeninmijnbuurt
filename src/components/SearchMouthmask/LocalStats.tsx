import { useEffect } from "react";
import { Trans } from "react-i18next";
import { Statistic, Space } from "antd";
import { useApi } from "../../hooks";
import { TStats } from "../../types";

const style = {
  padding: 32,
};

const LocalStats = () => {
  const { data: stats, callApi: fetchStats } = useApi<TStats>(
    "GET",
    "/stats/local"
  );

  useEffect(() => {
    fetchStats();
  }, []);

  return stats ? (
    <div style={{ textAlign: "center" }}>
      <Space>
        <Statistic
          style={style}
          title={<Trans i18nKey="requestor.stats.numMakers" />}
          value={10 + stats.numMakers}
        />
        <Statistic
          style={style}
          title={<Trans i18nKey="requestor.stats.numDelivered" />}
          value={50 + stats.numMasksDelivered}
        />
      </Space>
    </div>
  ) : null;
};

export default LocalStats;
