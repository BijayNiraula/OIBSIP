import { memo } from 'react'
import { Link } from 'react-router-dom'
import "./carts.css"
import { useSelector } from 'react-redux/es/exports';
import CartsItemsSection from './components/CartsItemsSection';
import CheckoutSection from './components/CheckoutSection';
import { CartItemInterface } from '../../utilities/interfaces/interface';
import { GlobalStateInterface } from '../../utilities/interfaces/interface';

const CartsPage: React.FC = () => {
  const cartsItems: CartItemInterface[] = useSelector((state: GlobalStateInterface) => state.carts.cartItems);
  return (
    <div className=" carts_page bg-dark text-light px-2 ">
      <div className="container py-2 h-100">
        <h5 className="mb-3 text-light" ><Link to="/" className="text-decoration-none fs-5 text-light"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className=" me-2 bi bi-arrow-left text-light" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
        </svg> Continue Ordering</Link></h5>
        <hr />
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <p className="mb-1">Pizza cart</p>
            <p className="mb-0">You have {cartsItems.length} items in your cart</p>
          </div>
          <div>
            <p className="mb-0 text-light"><span className="text-">Sort by:</span> <a href="#!"
              className="text-">price <i className="fas fa-angle-down mt-1"></i></a></p>
          </div>
        </div>
        <div className="row h-100  "  >
          <CartsItemsSection cartItems={cartsItems} />
          <CheckoutSection cartItems={cartsItems} />
        </div>
      </div>
    </div>
  )
}

export default memo(CartsPage)