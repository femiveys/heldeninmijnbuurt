import { Statistic, Space } from "antd";
import { useEffect } from "react";
import { TStats } from "../types";
import { useApi } from "../hooks";

const style = {
  padding: 32,
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
          title="Actieve superhelden"
          value={100 + stats.numMakers}
        />
        <Statistic
          style={style}
          title="Mondmaskers afgeleverd"
          value={500 + stats.numMasksDelivered}
        />
      </Space>
    </div>
  ) : null;
};

export default GlobalStats;
