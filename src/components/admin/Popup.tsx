import { TUser } from "../../types";

type TProps = {
  user: TUser;
};
const Popup = ({ user }: TProps) => (
  <div>
    <div>
      <b>{user.name}</b>
    </div>
    {user.isMaker ? (
      <div>
        <div>stock: {user.maskStock}</div>
        <div>geleverd: {user.numDelivered}</div>
      </div>
    ) : (
      <div>
        <div>{user.needsMouthmaskAmount} gevraagd</div>
      </div>
    )}
  </div>
);

export default Popup;
