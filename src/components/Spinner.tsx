import { Spin } from "antd";

type TProps = {
  tip: string;
};

const Spinner = ({ tip }: TProps) => (
  <div style={{ textAlign: "center" }}>
    <Spin
      size="large"
      delay={300}
      tip={tip}
      style={{ maxWidth: 200, marginTop: 200 }}
    />
  </div>
);

export default Spinner;
