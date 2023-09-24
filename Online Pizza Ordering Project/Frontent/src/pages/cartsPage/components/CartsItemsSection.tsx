import CartItemCard from "./CartItemCard"
import { CartItemInterface } from "../../../utilities/interfaces/interface"
import { memo } from 'react';


interface CartsItemsSectionProps {
  cartItems: CartItemInterface[]
}

const CartsItemsSection: React.FC<CartsItemsSectionProps> = ({ cartItems }) => {
  return (
    <div className="col-lg-7 pe-0 pe-md-3 m-0 p-0" style={{ overflowY: "scroll", maxHeight: "75%" }} >
      {
        cartItems.length ?
          cartItems.map((cartItem) => <CartItemCard type={cartItem.type} price={cartItem.price} size={cartItem.size} pizzaQuantity={cartItem.pizzaQuantity} pizzaName={cartItem.pizzaName} key={cartItem._id} _id={cartItem._id} />)
          : <p className='text-light text-center mt-3'>
            cart is empty ?
          </p>
      }
    </div>
  )
}

export default memo(CartsItemsSection)