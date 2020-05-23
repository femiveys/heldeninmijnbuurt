import { Steps } from "antd";
import { Trans } from "react-i18next";

type TProps = {
  current: number;
};

const CommonSteps = ({ current }: TProps) => (
  <Steps current={current} size="small">
    <Steps.Step title={<Trans i18nKey="steps.step1" />} />
    <Steps.Step title={<Trans i18nKey="steps.step2" />} />
    <Steps.Step title={<Trans i18nKey="steps.step3" />} />
  </Steps>
);

export default CommonSteps;
