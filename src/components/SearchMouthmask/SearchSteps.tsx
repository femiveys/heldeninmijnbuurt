import { Steps, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Trans } from "react-i18next";

const style = {
  padding: 16,
  paddingBottom: 0,
};

type TProps = {
  current: number;
};

const SearchSteps = ({ current }: TProps) => {
  const isSmall = screen && screen.width < 600;

  const steps = (
    <Steps
      current={current}
      size="small"
      labelPlacement={isSmall ? "horizontal" : "vertical"}
      direction={isSmall ? "vertical" : "horizontal"}
    >
      <Steps.Step title={<Trans i18nKey="requestor.steps.step1" />} />
      <Steps.Step title={<Trans i18nKey="requestor.steps.step2" />} />
      <Steps.Step title={<Trans i18nKey="requestor.steps.step3" />} />
      <Steps.Step title={<Trans i18nKey="requestor.steps.step4" />} />
      <Steps.Step title={<Trans i18nKey="requestor.steps.step5" />} />
    </Steps>
  );

  return isSmall ? (
    <div style={{ ...style, display: "flex", justifyContent: "flex-end" }}>
      <Dropdown
        overlay={<div>{steps}</div>}
        overlayStyle={{
          padding: 16,
          paddingBottom: 0,
          backgroundColor: "#fffe",
        }}
      >
        <Button>
          <Trans
            i18nKey="requestor.steps.progress"
            values={{ step: current + 1 }}
          />
          <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  ) : (
    <div style={style}>{steps}</div>
  );
};

export default SearchSteps;
