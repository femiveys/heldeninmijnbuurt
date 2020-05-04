import { Steps, Popover, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";

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
      <Steps.Step title="Aantal ingeven" />
      <Steps.Step title="Superheld zoeken" />
      <Steps.Step title="Op bevestiging wachten" />
      <Steps.Step title="Superheld contacteren" />
      <Steps.Step title="Klaar" />
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
          Voortgang: Stap {current + 1}/5
          <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  ) : (
    <div style={style}>{steps}</div>
  );
};

export default SearchSteps;
