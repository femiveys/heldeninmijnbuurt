import { Statistic, Space } from "antd";
import { useEffect } from "react";
import { TGlobalStats } from "../types";
import { useApi } from "../hooks";

const style = {
  padding: 32,
};

const GlobalStats = () => {
  const {
    isLoading: isFetchingGlobalStats,
    data: globalStats,
    callApi: fetchGlobalStats,
  } = useApi<TGlobalStats>("GET", "/stats");

  useEffect(() => {
    fetchGlobalStats();
  }, []);

  return globalStats ? (
    <div style={{ textAlign: "center" }}>
      <Space>
        <Statistic
          style={style}
          title="Actieve superhelden"
          value={100 + globalStats?.numMakers}
        />
        <Statistic
          style={style}
          title="Mondmaskers afgeleverd"
          value={500 + globalStats?.numMasksDelivered}
        />
      </Space>
    </div>
  ) : null;
};

export default GlobalStats;
