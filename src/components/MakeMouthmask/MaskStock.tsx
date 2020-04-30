import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useUser, useApi } from "../../hooks";
import { useCallback } from "react";

const { Text, Title } = Typography;

import "./styles.less";

const MaskStock = () => {
  const { t } = useTranslation();
  const { user, updateUser } = useUser();
  const { callApi: setMaskStock } = useApi("PUT", "superhero/setMaskStock");

  const stock = Number(user?.maskStock);

  const updateStock = useCallback(
    (value: string) => {
      const maskStock = Number(value);
      if (
        value.trim() !== "" &&
        Number.isSafeInteger(maskStock) &&
        maskStock !== stock
      ) {
        setMaskStock({ maskStock }); // In the background
        updateUser({ maskStock });
      }
    },
    [stock]
  );

  return (
    <div className="mask-stock">
      <Title level={4}>{t("maker.available.label")}</Title>
      <Text
        className="edit-mask-stock"
        style={{ fontSize: 32 }}
        editable={{ onChange: updateStock }}
      >
        {stock.toString()}
      </Text>
    </div>
  );
};

export default MaskStock;
