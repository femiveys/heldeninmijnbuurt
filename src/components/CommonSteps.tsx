import { Steps } from "antd";

type TProps = {
  current: number;
};

const CommonSteps = ({ current }: TProps) => (
  <Steps current={current} size="small">
    <Steps.Step title="Inloggen" />
    <Steps.Step title="Straat ingeven" />
    <Steps.Step title="Rol kiezen" />
  </Steps>
);

export default CommonSteps;
