import { memo } from 'react';

interface TrackOrderPropsInterce {
  _id: string,
  orderStatus: string
}

const TrackOrder: React.FC<TrackOrderPropsInterce> = ({ orderStatus }) => {
  const making: string = orderStatus === "making" || orderStatus === "delivering" || orderStatus === "completed" ? "active" : "";
  const delivering: string = orderStatus === "delivering" || orderStatus === "completed" ? "active" : ""
  const completed: string = orderStatus === "completed" ? "active" : ""

  return (
    <ul id="progressbar-1" className="mx-0 mt-3 pb-3 col-12  px-0 pt-0 d-flex w-100 " >
      <li className={` step0  active `} id="step1"><span style={{ marginTop: '12px' }}>receieved</span></li>
      <li className={`step0 ${making}  text-center`} id="step2"><span>making</span></li>
      <li className={`step0 ${delivering} text-center `} id="step3"><span>delivering</span></li>
      <li className={`step0 text-muted ${completed} text-end mt-sm-0  `} id="step4"><span style={{}}>completed</span></li>
    </ul>
  )
}

export default memo(TrackOrder)