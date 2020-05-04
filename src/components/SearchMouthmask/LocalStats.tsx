import { Statistic, Space } from "antd";
import { useEffect } from "react";
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
          title="Superhelden in je buurt"
          value={10 + stats.numMakers}
        />
        <Statistic
          style={style}
          title="Mondmaskers afgeleverd in je buurt"
          value={50 + stats.numMasksDelivered}
        />
      </Space>
    </div>
  ) : null;
};

export default LocalStats;
