import { CartItemInterface, GlobalStateInterface } from '../../../utilities/interfaces/interface';
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { memo } from 'react';
import fetchData from "../../../utilities/modules/fetchData";
import { infoToast } from "../../../utilities/modules/toastMessage";
import { removeAll } from '../../../store/slices/cartSlice';

interface OrderNowSectionProps {
  cartItems: CartItemInterface[]
}
const CheckoutSection: React.FC<OrderNowSectionProps> = ({ cartItems }) => {

  const authenticated = useSelector((state: GlobalStateInterface) => state.auth.authenticated)
  const email = useSelector((state: GlobalStateInterface) => state.auth.data.email);
  const navigate = useNavigate();
  const dispatch=useDispatch()
  let subTotal = 0;

  if (cartItems.length) {
    cartItems.forEach((currElement) => {
      subTotal = subTotal + (currElement.pizzaQuantity * currElement.price)
    })
  }
  subTotal = Number(subTotal.toFixed(1));
  const totalAmt = subTotal

  const checkout = async (e: any) => {
    e.preventDefault();
    if (totalAmt == 0) {
      infoToast("carts is empty");
      return;
    }
    const BackendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
    const customerNumber: string = e.target[0].value;
    const deliveryLocation = e.target[1].value;
    const result = await fetchData(`${BackendBaseUrl}/user/payment/checkout`, {
      method: "POST",
      body: JSON.stringify({ orders: cartItems}),
      credentials: "include",
      headers: {
        "content-type": "application/json"
      }
    });
    if (result.status == "error") {
      infoToast(result.message);
      return;
    }
    console.log(result)
    const ordersItems = encodeURIComponent(JSON.stringify(cartItems))
    var options = {
      "key": result.razorKeyId, // Enter the Key ID generated from the Dashboard
      "amount": result.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Pizza Hub",
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "order_id": result.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "callback_url": `http://localhost:8000/user/payment/verifyPayment?ordersItems=${ordersItems}`,
      "prefill": {
        "email": email,
        "contact": customerNumber
      },
      "notes": {
        "customerPhoneNumber": customerNumber,
        "deliveryLocation": deliveryLocation,
      },
      "theme": {
        "color": "#3399cc"
      }
    };
    var rzp1 = new (window as any).Razorpay(options) ;
    rzp1.open()
   dispatch(removeAll());
  }

  return (
    <section className="col-lg-5 col-12">
      <div className="card bg-light text- rounded-3">
        <form onSubmit={checkout} className="card-body">
          <div className=" mb-4">
            <h5 className="mb-0">Devlivery Information</h5>
            <hr className="my-4" />
            <div className="">
              <input type="number" placeholder="contact number" className="w-100 px-2 py-1" required />
            </div>
            <div className="mt-3">
              <input type="address" placeholder="Delivery Address" className="w-100 px-2 py-1" required />
            </div>
          </div>
          <hr className="my-4" />
          <div className="d-flex justify-content-between">
            <p className="mb-2">Subtotal : </p>
            <p className="mb-2"> $ {subTotal}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p className="mb-2">Service Charge (0 %) : </p>
            <p className="mb-2">$ 0</p>
          </div>
          <div className="d-flex justify-content-between mb-4">
            <p className="mb-2">Total(Incl. taxes) : </p>
            <p className="mb-2">$ {totalAmt}</p>
          </div>
          {
            authenticated ?
              <button className="btn btn-success btn-block btn-lg">
                <div className="d-flex justify-content-between">
                  <span className='ms-2'> Checkout <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className=" ms-2 bi bi-arrow-right" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                  </svg></span>
                </div>
              </button>
              : <button onClick={() => navigate('/login')} type="button" className="btn btn-success btn-block btn-lg">
                <div className="d-flex justify-content-between">
                  <span className='ms-2'>Checkout<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className=" ms-2 bi bi-arrow-right" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                  </svg></span>
                </div>
              </button>
          }
        </form>
      </div>
    </section>
  )
}

export default memo(CheckoutSection)