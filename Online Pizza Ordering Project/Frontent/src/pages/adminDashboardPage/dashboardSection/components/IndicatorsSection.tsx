import Indicator from "./Indicator"
import { useSocketContext } from "../../../../Contexts/SocketProvider";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { memo, useState, useEffect } from "react";
import { GlobalStateInterface } from '../../../../utilities/interfaces/interface';

const IndicatorsSection = () => {

    const [liveTraffic, setLiveTraffic] = useState<number>(0)
    const socket: Socket | null = useSocketContext();
    const noOfOrders = useSelector((state: GlobalStateInterface) => state.orders.orderItems).length;
    const noOfMenuItems = useSelector((state: GlobalStateInterface) => state.menu.menuItems).length

    useEffect(() => {
        if (socket) {
            socket.on("liveTraffic", (data) => {
                setLiveTraffic(data)
            })
        }
    }, [socket])

    return (
        <section className="indicators ">
             <h4 className=''>Indicators</h4>
            <div className="d-flex mt-3 row w-100 p-0 m-0 justify-content-around">
                <Indicator heading="No of Orders" totalNumber={noOfOrders} className="border-primary" />
                <Indicator heading="Menu Items" totalNumber={noOfMenuItems} className="border-warning" />
                <Indicator heading="Live Traffic" totalNumber={liveTraffic} className="border-success mt-sm-0 mt-4" />
            </div>
        </section>
    )
}

export default memo(IndicatorsSection)