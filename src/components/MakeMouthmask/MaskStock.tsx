import { Typography, Input, Button } from "antd";
import { useUser, useApi } from "../../hooks";
import {
  useCallback,
  useState,
  FocusEventHandler,
  KeyboardEventHandler,
} from "react";
import { EditOutlined, EnterOutlined } from "@ant-design/icons";

const { Text } = Typography;

import "./styles.less";
import { forceMaxLength } from "../../helpers";

const fontSize = 24;
const width = 80;

const MAX_LENGTH = 3;

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

  const onInput = (value: string) => {
    setIsEditable(false);
    updateStock(value);
  };

  const onEdit: FocusEventHandler<HTMLInputElement> = (e) =>
    onInput(e.currentTarget.value);

  const onPressEnter: KeyboardEventHandler<HTMLInputElement> = (e) =>
    onInput(e.currentTarget.value);

  const onClick = () => setIsEditable(true);

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
            maxLength={MAX_LENGTH}
            defaultValue={stock}
            onBlur={onEdit}
            onPressEnter={onPressEnter}
            onPaste={(event) => event.preventDefault()}
            onKeyDown={forceMaxLength(MAX_LENGTH)}
          />
          <EnterOutlined style={{ position: "absolute", right: 6, top: 2 }} />
        </span>
      ) : (
        <span style={{ width }}>
          <Text style={{ fontSize }}>{stock.toString()}</Text>
          <Button
            type="link"
            onClick={onClick}
            icon={<EditOutlined style={{ fontSize }} />}
          />
        </span>
      )}
    </div>
  );
};

export default MaskStock;
