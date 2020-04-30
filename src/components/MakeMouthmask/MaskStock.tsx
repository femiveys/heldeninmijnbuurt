import { Typography } from "antd";
import { useUser, useApi } from "../../hooks";
import { useCallback } from "react";

const { Text } = Typography;

import "./styles.less";

type TProps = {
  stock: string;
  fetchRequested: () => Promise<void>;
};

const MaskStock = ({ stock, fetchRequested }: TProps) => {
  const { updateUser, user } = useUser();
  const { callApi: setMaskStock } = useApi("PUT", "superhero/setMaskStock");

  const updateStock = useCallback(
    async (value: string) => {
      const maskStock = Number(value);
      if (
        value.trim() !== "" &&
        Number.isSafeInteger(maskStock) &&
        maskStock !== Number(stock)
      ) {
        updateUser({ maskStock });
        await setMaskStock({ maskStock });
        if (maskStock > Number(user?.maskStock)) {
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
        {stock}
      </Text>
    </div>
  );
};

export default MaskStock;
