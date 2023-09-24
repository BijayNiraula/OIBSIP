import { OrderItemInterface } from "../../../utilities/interfaces/interface"
import TrackOrder from "./TrackOrder"
import pizzaImg from "../../../assets/pizzaImg.jpg"
import { memo } from 'react';

const OrderItemCard:React.FC<OrderItemInterface> = ({_id,time,paidAmt,orders,orderStatus}) => {
  const date = new Date(time);
  const formatedDate = `${date.getDate()}/${(Number(date.getMonth()) + 1)}/${date.getFullYear()} , ${date.getHours()}:${date.getMinutes()}`
 
  return (
    <section className='col-lg-7 col-md-8 col-sm-12 col-12 pt-2 row shadow  mb-5 order_item_card  bg-light' >
        <div className='row   w-100 m-0 p-0 d-flex  justify-content-center '>
           <div className="col-md-3 col-sm-4 col-8 mb-4 mb-sm-0">
                  <img className='w-100 img-fluid' width={150}  height={150}  src={pizzaImg} alt="" />
           </div>
           <div className="col-sm-5 col-8 ">
            <p className="item_name  fw-5">
            {orders}
            </p>
           </div>
           
           <div className="col-sm-3 col-3  text-danger  fw-bold fs-5 text-end">
            $ {paidAmt}
           </div>
        </div>
        <hr />
       <p className="fw-5 fs-5 col-12  m-0 p-0 d-flex justify-content-between"><span> Track Order : </span>  <span className="fs-6 text-muted">Order Time : {formatedDate}</span></p>
       <TrackOrder orderStatus={orderStatus} _id={_id}/>
      </section>
  )
}

export default memo(OrderItemCard)