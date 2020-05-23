import { Statistic, Space } from "antd";
import { useEffect } from "react";
import { TStats } from "../types";
import { useApi } from "../hooks";
import { Trans } from "react-i18next";

const style = {
  padding: 16,
  paddingTop: 0,
};

const GlobalStats = () => {
  const { data: stats, callApi: fetchStats } = useApi<TStats>(
    "GET",
    "/stats/global"
  );

  useEffect(() => {
    fetchStats();
  }, []);

  return stats ? (
    <div style={{ textAlign: "center" }}>
      <Space>
        <Statistic
          style={style}
          title={<Trans i18nKey="stats.numMakers" />}
          value={100 + stats.numMakers}
        />
        <Statistic
          style={style}
          title={<Trans i18nKey="stats.numDelivered" />}
          value={500 + stats.numMasksDelivered}
        />
      </Space>
    </div>
  ) : null;
};

export default GlobalStats;
