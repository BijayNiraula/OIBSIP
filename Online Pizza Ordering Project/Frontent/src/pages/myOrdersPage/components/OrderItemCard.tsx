import { OrderItemInterface } from "../../../utilities/interfaces/interface"
import TrackOrder from "./TrackOrder"
import pizzaImg from "../../../assets/pizzaImg.jpg"
import { memo } from 'react';

const OrderItemCard: React.FC<OrderItemInterface> = ({ _id, time, paidAmt, orders, orderStatus, orderId }) => {
  const date = new Date(time);
  const formatedDate = `${date.getDate()}/${(Number(date.getMonth()) + 1)}/${date.getFullYear()} , ${date.getHours()}:${date.getMinutes()}`

  return (
    <section className="card shadow-0 border mb-4  col-lg-8 col-sm-10 col-12">
      <div className="card-body px-0 px-sm-2">
        <div className="row">
          <div className="col-md-3 text-center">
            <img src={pizzaImg} className="img-fluid" alt="Phone" />
          </div>
          <div className="col-md-5 text-center mt-md-0 mt-2 text-md-start d-flex justify-content-center align-items-center">
            <p className="text-muted fw-bold mb-0">{orders}</p>
          </div>
          <div className="col-md-2">
          </div>
          <div className="col-md-2 text-center mt-md-0 mt-2 d-flex justify-content-center align-items-center">
            <p className=" mb-0 small text-danger fs-4">$ {paidAmt}</p>
          </div>
        </div>
        <p className="text-md-end text-center py-0 my-0 mt-md-0 mt-2">
          <small className="me-2 fw-5">
            order id :
          </small>
          <small className="text-muted">
            {orderId}
          </small>
        </p>
        <hr className="mb-2" style={{ backgroundColor: '#e0e0e0', opacity: 1 }} />
        <p className=" fw-5 fs-6 col-12  m-0 p-0 d-flex justify-content-between"><span> Track Order : </span>  <span className="fs-6 text-muted">Order Time : {formatedDate}</span></p>
        <TrackOrder orderStatus={orderStatus} _id={_id} />
      </div>
    </section>
  )
}

export default memo(OrderItemCard)