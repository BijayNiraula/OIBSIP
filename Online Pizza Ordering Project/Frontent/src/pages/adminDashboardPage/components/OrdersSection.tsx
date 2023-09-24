import { memo, useEffect } from 'react';
import OrdersTableRow from './OrdersTableRow';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderItemsFunction } from '../../../store/slices/orderSlice';
import { GlobalStateInterface, OrderItemInterface } from '../../../utilities/interfaces/interface';
import { statuses } from '../../../utilities/enums/statusEnum';
import ReactLoading from 'react-loading';
import RefreshOrdersSectionBtn from './RefreshOrdersSectionBtn';

const OrdersSection = () => {
  const dispatch = useDispatch<any>()
  const { orderItems, status } = useSelector((state: GlobalStateInterface) => state.orders)
  useEffect(() => {
    dispatch(getOrderItemsFunction())
  }, [])

  return (
    <section className='h-100  ' style={{ maxHeight: "100vh" }}>
      <div className=" w-100" style={{ maxHeight: "20vh" }}  >
        <h3 className='text-center mt-3 fw-6 fs-2'>
          Receieved  Orders
        </h3>
        <div className="d-flex justify-content-end">

        </div>
      </div>
      <div className="mt-3 " style={{ maxHeight: "80vh", overflowY: "scroll" }} >
        <RefreshOrdersSectionBtn/>
        <table className="table table-hover table-bordered mt-2">
          <thead className=''>
            <tr >
              <th scope="col">order id</th>
              <th scope="col">orders</th>
              <th scope="col">Amt Paid</th>
              <th scope="col"> contact No</th>
              <th scope="col"> delivery location</th>
              <th scope="col">order time</th>
              <th scope="col">status</th>
            </tr>
          </thead>
          <tbody >

            {
              orderItems.length ? orderItems.map((orderItem: OrderItemInterface) => <OrdersTableRow key={orderItem._id} userId={orderItem.userId} _id={orderItem._id} orderId={orderItem.orderId} deliveryLocation={orderItem.deliveryLocation} time={orderItem.time} customerPhoneNumber={orderItem.customerPhoneNumber} orders={orderItem.orders} paidAmt={orderItem.paidAmt} orderStatus={orderItem.orderStatus} />)
                : status===statuses.IDLE ? <p className='text-center  fs-5 pt-5'>No Orders ?</p>:""
            }

          </tbody>
        </table>
        
        {
          status === statuses.LOADING ?
            <div className="d-flex justify-content-center mt-5" >
              <ReactLoading type="spokes" className="d-flex justify-content-center align-items-center me-2 text-dark" color={"rgba(0, 0, 0, 0.925)"} height={'50px'} width={'50px'} /></div>
            : ""
        }

        {
          status === statuses.ERROR ?
            <p className='text-center fs-5'> Error occured ?</p>
            : ""
        }
      </div>

    </section>
  )
}

export default memo(OrdersSection)