import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { updateOrderStatusFunction } from '../../../store/slices/orderSlice';

interface OrderStatusDropDownProps{
    orderId:string,
    userId:string,
    _id:string,
    orderStatus:string
}
const OrderStatusDropDown:React.FC<OrderStatusDropDownProps> = ({orderStatus,userId,_id}) => {
 const dispatch=useDispatch<any>()

  const handleStatusChange=(e:any)=>{
    const newOrderStatus=e.target.value;
     if(orderStatus===newOrderStatus) return;
     if(newOrderStatus==="completed"){
      const a=window.confirm("Completed order will be deleted from database . Are you sure?  ")
      if(!a){
        e.target.value=orderStatus;
        return;
      } 
    } 
        dispatch(updateOrderStatusFunction({_id,userId,orderStatus:newOrderStatus}))
  }
 
  return (
    <select onClick={handleStatusChange} name="" id="">
    <option  selected={orderStatus=="receieved"?true:false} value="receieved">receieved</option>
    <option selected={orderStatus=="making"?true:false}  value="making">making</option>
    <option  selected={orderStatus=="delivering"?true:false} value="delivering">delivering</option>
    <option selected={orderStatus=="completed"?true:false} value="completed">completed</option>
  </select>
  )
}

export default memo(OrderStatusDropDown)