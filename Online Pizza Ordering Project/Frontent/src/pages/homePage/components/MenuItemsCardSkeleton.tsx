import { memo } from "react"

const MenuItemsCardSkeleton:React.FC = () => {
  return (
    <div className=" col-lg-6 m-0 p-0  col-sm-12 col-11  p-md-4 py-3  ">
    <div className="row menu_items_card_skeleton p-1 pt-2 m-0 p-0  w-100">
      <div className="col-lg-6 col-sm-5  ">
        <span className="placeholder-glow w-100" style={{ height: "200px" }}>
          <p className="placeholder w-100 h-100"></p>
        </span>
      </div>
      <div className="col-lg-6   col-sm-7  mt-2 mt-sm-0">
        <span className="placeholder-glow row w-100">
          <p className="placeholder py-3 col-11"></p>
          <p className="placeholder col-12"></p>
          <p className="placeholder col-12"></p>
          <p className="placeholder col-12"></p>
        </span>
        <span className="placeholder-glow text-center row d-flex justify-content-center">
          <p className="col-6 placeholder py-3"></p>
        </span>
      </div>
    </div>
    </div>
  )
}

export default memo(MenuItemsCardSkeleton)