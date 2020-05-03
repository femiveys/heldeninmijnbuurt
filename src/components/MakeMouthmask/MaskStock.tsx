import { Typography, Input, Button } from "antd";
import { useUser, useApi } from "../../hooks";
import { useCallback, useState } from "react";
import { EditOutlined, EnterOutlined } from "@ant-design/icons";

const { Text } = Typography;

import "./styles.less";

type TProps = {
  stock: number;
  fetchRequested: () => Promise<void>;
};

const MaskStock = ({ stock, fetchRequested }: TProps) => {
  const { updateUser } = useUser();
  const [isEditable, setIsEditable] = useState(false);
  const { callApi: setMaskStock } = useApi("PUT", "superhero/setMaskStock");

  const updateStock = useCallback(
    async (value: string) => {
      const maskStock = Number(value);
      if (
        value.trim() !== "" &&
        Number.isSafeInteger(maskStock) &&
        maskStock !== stock
      ) {
        updateUser({ maskStock });
        await setMaskStock({ maskStock });
        if (maskStock > stock) {
          fetchRequested();
        }
      }
    },
    [stock]
  );

  const onEdit = (e: any) => {
    setIsEditable(false);
    updateStock(e.target.value as any);
  };

  const onClick = () => {
    setIsEditable(true);
  };

  const fontSize = 24;
  const width = 80;

  return (
    <div>
      {isEditable ? (
        <span style={{ position: "relative" }}>
          <Input
            autoFocus
            type="number"
            style={{
              width,
              fontSize,
              padding: 0,
              border: 0,
              paddingRight: 32,
              textAlign: "center",
            }}
            onBlur={onEdit}
            onPressEnter={onEdit}
            defaultValue={stock}
          />
          <EnterOutlined style={{ position: "absolute", right: 6, top: 2 }} />
        </span>
      ) : (
        <span style={{ width }}>
          <Text style={{ fontSize }}>{stock.toString()}</Text>
          <Button
            icon={<EditOutlined style={{ fontSize }} />}
            type="link"
            onClick={onClick}
          />
        </span>
      )}
    </div>
  );
};

export default MaskStock;
