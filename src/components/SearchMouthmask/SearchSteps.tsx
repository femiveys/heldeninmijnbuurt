import { Steps, Popover } from "antd";

type TProps = {
  current: number;
};

const SearchSteps = ({ current }: TProps) => (
  <Steps
    current={current}
    size="small"
    style={{ padding: 16, paddingBottom: 0 }}
  >
    <Steps.Step
      title={
        <Popover content="Ingeven hoeveel mondmaskers je nodig hebt">
          <span>Aantal</span>
        </Popover>
      }
    />
    <Steps.Step title="Zoek" />
    <Steps.Step title="Wacht " />
    <Steps.Step title="Contact" />
    <Steps.Step title="Klaar" />
  </Steps>
);

export default SearchSteps;
