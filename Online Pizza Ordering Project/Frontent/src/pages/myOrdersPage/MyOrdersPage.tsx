import BackButton from "../../repeatedComponents/BackButton"
import "./myOrder.css"
import { memo, useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query";
import OrderItemCard from './components/OrderItemCard';
import { GlobalStateInterface, OrderItemInterface } from "../../utilities/interfaces/interface";
import { useSelector } from "react-redux";
import ReactLoading from 'react-loading';
import { errorToast, infoToast } from "../../utilities/modules/toastMessage";
import { useSocketContext } from "../../Contexts/SocketProvider";
import { Socket } from "socket.io-client";

interface ApiDataInteface {
  data: OrderItemInterface[],
  status: string,
  message: string,
}

const MyOrdersPage: React.FC = () => {
  const socket: Socket | null = useSocketContext();
  const [orderItems, setOrderItems] = useState([])
  const userId = useSelector((state: GlobalStateInterface) => state.auth.data.userId)
  const apiUrl = import.meta.env.VITE_BACKEND_BASE_URL + "/user/orders";

  const { data, isLoading, error } = useQuery<ApiDataInteface>({
    queryKey: ['orderItems'],
    queryFn: async () => {
      const res = await fetch(apiUrl, {
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json"
        }
      })
      return res.json();
    }
  });

  useEffect(() => {
    if (socket) {
      socket.emit("join", userId);
      socket.on("updatedOrderStatus", ({ orderStatus, _id }) => {
        infoToast("your order is " + orderStatus)
        setOrderItems((orderItems: OrderItemInterface[]): any => {
          orderItems.forEach((currElem, index) => {
            if (currElem._id === _id) {
              orderItems[index].orderStatus = orderStatus
            }
          })
          return [...orderItems]
        })
      })
    }
  }, [socket])


  useEffect(() => {
    if (data) {
      if (data.status === "error") {
        errorToast(data.message)
      } else {
        setOrderItems(data.data as [])
      }
    }
  }, [data])

  return (
    <section className="   my_orders_page  bg-dark">
      <div className="container h-100 ">
        <div className=" ">
          <div className="d-flex justify-content-start">
            <BackButton url="/" text="Back" addClassName="text-light , mt-3" />
          </div>
          <h3 className="text_light text-center fs-2">
            My Orders
          </h3>
        </div>
        <div className="row d-flex  justify-content-center pt-3 px-2 " style={{ overflowY: "scroll", maxHeight: "85vh", overflowX: "hidden" }}>

          {
            orderItems.length ? orderItems.map((orderItem: OrderItemInterface) => <OrderItemCard key={orderItem._id} userId={orderItem.userId} orderId={orderItem.orderId} orders={orderItem.orders} time={orderItem.time} deliveryLocation={orderItem.deliveryLocation} customerPhoneNumber={orderItem.customerPhoneNumber} _id={orderItem._id} paidAmt={orderItem.paidAmt} orderStatus={orderItem.orderStatus} />)
              : !isLoading && !error ? <p className='text-center text-light fs-5 pt-5'>No Orders ?</p> : ""
          }

          {
            isLoading ?
              <div className="d-flex align-items-center flex-column justify-content-center mt-5 pt-5" >
                <ReactLoading type="spokes" className="d-flex justify-content-center align-items-center me-2 text-dark" color={"#ffff"} height={'50px'} width={'50px'} />
              </div>
              : ""
          }

          {
            error ?
              <p className='text-center text-light fs-5 pt-5'> Error occured ?</p>
              : ""
          }

        </div>
      </div>
    </section>
  )
}

export default memo(MyOrdersPage)