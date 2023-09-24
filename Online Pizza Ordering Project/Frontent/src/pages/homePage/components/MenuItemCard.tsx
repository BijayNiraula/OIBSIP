import React, { memo } from 'react';
import AddToCartBtn from './AddToCartBtn';
import pizzaImg from "../../../assets/pizzaImg.jpg"
import { MenuItemInterFace } from '../../../utilities/interfaces/interface';

const MenuItemCard: React.FC<MenuItemInterFace> = ({ pizzaName, price, type, size, description, _id }) => {


  return (
    <div className='col-lg-6 col-sm-12 col-11 px-md-4  py-3 '>
      <div className='row  menu_item-card border  p-2'>
        <div className="col-lg-6 col-sm-5">
          <img src={pizzaImg} width={200} className='img-fluid w-100' height={200} alt="pizza_img" />
        </div>
        <div className="col-lg-6 col-sm-7 mt-2 mt-sm-0">
          <div className="d-flex justify-content-between">
            <h4 className="title text-warning fw-5 fs-4 menu_item_name pe-2">{pizzaName},
            <p className="small mb-0 fs-6 text-small"> {size} , {type}</p>
            </h4>
            <span className='fs-4 fw-5 text-warning'>${price}</span>
          </div>
          <p className="">
            {description}
          </p>
          <AddToCartBtn pizzaName={pizzaName} pizzaQuantity={1} _id={_id} price={price} size={size} type={type} />
        </div>
      </div>
    </div>

  )
}

export default memo(MenuItemCard)