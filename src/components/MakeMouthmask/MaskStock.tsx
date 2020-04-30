import { Typography } from "antd";
import { useUser, useApi } from "../../hooks";
import { useCallback } from "react";

const { Text } = Typography;

import "./styles.less";

type TProps = {
  stock: string;
};

const MaskStock = ({ stock }: TProps) => {
  const { updateUser } = useUser();
  const { callApi: setMaskStock } = useApi("PUT", "superhero/setMaskStock");

  const updateStock = useCallback(
    (value: string) => {
      const maskStock = Number(value);
      if (
        value.trim() !== "" &&
        Number.isSafeInteger(maskStock) &&
        maskStock !== Number(stock)
      ) {
        setMaskStock({ maskStock }); // In the background
        updateUser({ maskStock });
      }
    },
    [stock]
  );

  return (
    <div className="mask-stock">
      <Text
        className="edit-mask-stock"
        style={{ fontSize: 24 }}
        editable={{ onChange: updateStock }}
      >
        {stock}
      </Text>
    </div>
  );
};

export default MaskStock;
