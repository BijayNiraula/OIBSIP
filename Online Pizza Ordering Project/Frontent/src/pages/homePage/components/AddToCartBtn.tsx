import { memo } from 'react';
import { add } from '../../../store/slices/cartSlice';
import {useDispatch} from "react-redux"
import { CartItemInterface } from '../../../utilities/interfaces/interface';

const AddToCartBtn:React.FC<CartItemInterface> = ({_id,pizzaName,price,size,type}) => {

const dispatch=useDispatch<any>();

const handleAddToCart=()=>{
    dispatch(add({_id,price,type,size,pizzaName,pizzaQuantity:1}))
}

  return (
    <button onClick={handleAddToCart} className='btn btn-light d-flex align-items-center  ' > <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart4 me-2" viewBox="0 0 16 16">
    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
  </svg> Add to Cart</button>
  )
}

export default memo(AddToCartBtn)