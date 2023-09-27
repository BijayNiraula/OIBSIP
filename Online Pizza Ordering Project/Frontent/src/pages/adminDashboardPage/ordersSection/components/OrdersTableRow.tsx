import { memo } from "react";
import { OrderItemInterface } from "../../../../utilities/interfaces/interface"
import OrderStatusDropDown from "./OrderStatusDropDown";

const OrdersTableRow: React.FC<OrderItemInterface> = ({_id, userId,orderStatus,time, orders, paidAmt, deliveryLocation, customerPhoneNumber, orderId }) => {
  const date = new Date(time);
  const formatedDate = `${date.getDate()}/${(Number(date.getMonth()) + 1)}/${date.getFullYear()},${date.getHours()}:${date.getMinutes()}`
  return (
    <tr>
      <td >{orderId}</td>
      <td>{orders}</td>
      <td>$ {paidAmt}</td>
      <td>{customerPhoneNumber}</td>
      <td scope="">{deliveryLocation}</td>
      <td>{formatedDate}</td>
      <td>
       <OrderStatusDropDown _id={_id} orderStatus={orderStatus} orderId={orderId} userId={userId}/>
      </td>
    </tr>
  )
}

export default memo(OrdersTableRow)