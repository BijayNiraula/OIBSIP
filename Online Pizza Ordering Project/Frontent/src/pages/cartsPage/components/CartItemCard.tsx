import { memo } from "react"
import RemoveCartsItemBtn from "./RemoveCartsItemBtn"
import { CartItemInterface } from "../../../utilities/interfaces/interface"
import { useDispatch } from "react-redux"
import { edit } from "../../../store/slices/cartSlice"
import pizzaImg from "../../../assets/pizzaImg.jpg"

const CartItemCard: React.FC<CartItemInterface> = ({ _id, type, price, pizzaName, pizzaQuantity, size }) => {
  const dispatch = useDispatch<any>();
  const handleChange = (quantity: number) => {
    if (quantity > 0) {
      dispatch(edit({ _id, quantity }))
      return;
    }
  }

  return (
    <div className=" row  p-0 m-0  bg-light text-dark py-2 my-3">
      <div className=" col-3 d-flex align-items-center  ">
        <img
          src={pizzaImg}
          className="img-fluid w-100  " height={50} width={50} alt="pizza_img" />
      </div>
      <div className="col-3    d-flex flex-column justify-content-center">
        <h5 className='fs-6'>{pizzaName} </h5>
        <p className="small mb-0"> {size} , {type}</p>
      </div>
      <div className="col-3 col-sm-2  d-flex align-items-center">
        <span className="d-flex w-100 ">
          <button onClick={() => handleChange(pizzaQuantity - 1)} className=" border border-1 text-center  fs-4" >+</button>
          <span className="px-2 d-flex align-items-center  border border-dark">
            {
              pizzaQuantity
            }
          </span>
          <button onClick={() => handleChange(pizzaQuantity + 1)} className=" text-center border border-1 fs-4 ">-</button>
        </span>
      </div>
      <div className="col-1 col-sm-2  d-flex align-items-center">
        <h5 className="mb-0 fs-6 ">$ {price}</h5>
      </div>
      <div className="col-2  d-flex align-items-center">
        <RemoveCartsItemBtn _id={_id} />
      </div>
    </div>
  )
}

export default memo(CartItemCard)