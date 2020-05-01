import { Typography } from "antd";
import { useUser, useApi } from "../../hooks";
import { useCallback } from "react";

const { Text } = Typography;

import "./styles.less";

type TProps = {
  stock: number;
  fetchRequested: () => Promise<void>;
};

const MaskStock = ({ stock, fetchRequested }: TProps) => {
  const { updateUser } = useUser();
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

  return (
    <div className="mask-stock">
      <Text
        className="edit-mask-stock"
        style={{ fontSize: 24 }}
        editable={{ onChange: updateStock }}
      >
        {stock.toString()}
      </Text>
    </div>
  );
};

export default MaskStock;
