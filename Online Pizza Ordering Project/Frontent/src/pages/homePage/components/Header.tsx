
import { memo } from 'react';
import CartButton from './CartButton';
import SideBar from './SideBar';
import { useRef } from "react"
import { Link } from 'react-router-dom';
import LoginLogoutBtn from './LoginLogoutBtn';
const Header: React.FC = () => {
  const sidebar = useRef<any>();

  const controlSideBar = (open: boolean) => {
    if (open) {
      sidebar.current.style.left = 0;
      return true;
    }
    sidebar.current.style.left = "-300px";
  }

  return (
    <header className='  py-2 shadow-md bg-dark'>
      <div className="container ">
        <div className=" row   align-items-center d-flex  text-light">
          <h1 className="col-md-4 col-lg-6 d-flex align-items-center col-8 fs-2 fw-bold ">
            <button onClick={() => controlSideBar(true)} className=" open_sidebar_btn btn btn-dark d-md-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
              </svg>
            </button>

            Pizza Hub
          </h1>
          <div className=" col-md-8 col-lg-6 col-4  px-md-0 px-4  d-flex align-items-center  justify-content-md-around justify-content-end text-white  ">
            <a href='#landing_section' className='d-md-flex d-none links'>Home</a>
            <a href='#menu_section' className='d-md-flex d-none links'>Menu</a>
            <Link to="/MyOrders" className='d-md-flex d-none links'>Orders</Link>
            <a href='#about_section' className='d-md-flex d-none links'>About</a>
            <a href='#contact_section' className='d-md-flex d-none links'>Contact</a>
            <div className=' d-flex align-items-center ms-2'>
              <div className='d-none d-md-block d-flex align-items-center'>
                <LoginLogoutBtn />
              </div>
              <CartButton />
            </div>
          </div>
        </div>
      </div>
      <div className='sidebar bg-dark  border-white border d-md-none' ref={sidebar}>
        <SideBar controlSideBar={controlSideBar} />
      </div>
    </header>
  )
}

export default memo(Header)