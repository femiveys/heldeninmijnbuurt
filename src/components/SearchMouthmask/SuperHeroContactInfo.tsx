import { TUser, TRelation } from "../../types";
import { Card, Space } from "antd";

type TProps = {
  user: TUser;
  relation: TRelation;
};

export const SuperHeroContactInfo: React.FunctionComponent<TProps> = (
  props
) => {
  return (
    <Card title="Jouw superheld">
      <Space size="large" direction="vertical">
        <div>{props.user.name}</div>
        <div>
          <a href={`mailto:${props.user.email}`} target="_blank">
            {props.user.email}
          </a>
        </div>
      </Space>
    </Card>
  );
};
