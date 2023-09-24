import { memo, useEffect } from 'react';
import MenuItemsTableRow from './MenuItemsTableRow';
import AddMenuItemModal from './AddMenuItemModal';
import EditMenuItemModal from './EditMenuItemModal';
import { statuses } from '../../../utilities/enums/statusEnum';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalStateInterface, MenuItemInterFace } from '../../../utilities/interfaces/interface';
import { getMenuItemsFunction } from '../../../store/slices/menuSlice';
import ReactLoading from 'react-loading';
import RefreshMenuSectionBtn from './RefreshMenuSectionBtn';

const MenuSection: React.FC = () => {

  const { menuItems, status } = useSelector((state: GlobalStateInterface) => state.menu);
  const dispatch = useDispatch<any>()
  const handleGetMenuItems = () => {
    dispatch(getMenuItemsFunction())
  }

  useEffect(() => {
    handleGetMenuItems()
  }, [])

  return (
    <section className='h-100  ' style={{ maxHeight: "100vh" }}>
      <EditMenuItemModal />
      <div className=" w-100" style={{ maxHeight: "20vh" }}  >
        <h3 className='text-center mt-3 fw-6 fs-2'>
          Menu Items
        </h3>
        <div className="d-flex justify-content-between">
          <RefreshMenuSectionBtn/>
          <AddMenuItemModal />
        </div>
      </div>
      <div className="mt-3 " style={{ maxHeight: "80vh", overflowY: "scroll" }} >
        <table className="table table-hover table-bordered">
          <thead className=''>
            <tr >
              <th scope="col">pizza id</th>
              <th scope="col">pizza name</th>
              <th scope="col"> size</th>
              <th scope="col">type</th>
              <th scope="col">price</th>
              <th scope="col">stock</th>
              <th scope="col">actions</th>
            </tr>
          </thead>
          <tbody >

            {
              menuItems.length && status === statuses.IDLE ? menuItems.map((menuItem: MenuItemInterFace) => <MenuItemsTableRow key={menuItem._id} _id={menuItem._id} pizzaName={menuItem.pizzaName} size={menuItem.size} type={menuItem.type} price={menuItem.price} description={menuItem.description} stock={menuItem.stock} />)
                : status === statuses.IDLE ? <p className='text-center  fs-5 pt-5'>Menu is  Empty ?</p> : ""
            }

          </tbody>
        </table>

        {
          status === statuses.LOADING ?
            <div className="d-flex align-items-center flex-column justify-content-center mt-5" >
              <ReactLoading type="spokes" className="d-flex justify-content-center align-items-center me-2 text-dark" color={"rgba(0, 0, 0, 0.925)"} height={'50px'} width={'50px'} />
            </div>
            : ""
        }

        {
          status === statuses.ERROR ?
            <p className='text-center fs-5'> Error occured ?</p>
            : ""
        }

      </div>
    </section>
  )
}

export default memo(MenuSection)