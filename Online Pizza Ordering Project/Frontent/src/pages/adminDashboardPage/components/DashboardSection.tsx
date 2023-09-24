import { memo,useState, useEffect } from 'react';
import Indicators from './Indicators';
import { useSelector } from 'react-redux';
import { GlobalStateInterface } from '../../../utilities/interfaces/interface';
import { Socket } from 'socket.io-client';
import { useSocketContext } from '../../../Contexts/SocketProvider';

const DashboardSection: React.FC = () => {
  const[ liveTraffic, setLiveTraffic] = useState(0)
  const socket:Socket|null=useSocketContext();
  const noOfOrders  =useSelector((state:GlobalStateInterface)=>state.orders.orderItems).length; 
  const noOfMenuItems=useSelector((state:GlobalStateInterface)=>state.menu.menuItems).length
 
  useEffect(()=>{
    if(socket){
      socket.on("liveTraffic",(data)=>{
        setLiveTraffic(data)
      })
    }
  },[socket])

  return (
    <section className='bg-light dashboard_section py-2 w-100'>
          <h3 className=''>Dashboard</h3>
       <section className="indicators mt-4">
        <div className="d-flex row w-100 p-0 m-0 justify-content-around">
        <Indicators heading="No of Orders" totalNumber={noOfOrders} className="border-primary"/>
        <Indicators heading="Menu Items" totalNumber={noOfMenuItems} className="border-warning"/>
        <Indicators heading="Live Traffic" totalNumber={liveTraffic} className="border-success mt-sm-0 mt-4"/>
        </div>
      </section>     
    </section>
  )
}

export default memo(DashboardSection)