
import { memo } from 'react';
import CartButton from './CartButton';
import SideBar from './SideBar';
import { useRef } from "react"
import LoginLogoutBtn from './LoginLogoutBtn';
import { Link as RouteLink } from 'react-router-dom';
import { Link } from "react-scroll"
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
          <h1 className="col-md-4 col-lg-5 d-flex align-items-center col-8 fs-2 fw-bold ">
            <button onClick={() => controlSideBar(true)} className=" open_sidebar_btn btn btn-dark d-md-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
              </svg>
            </button>

            Pizza Hub
          </h1>
          <div className=" col-md-8 col-lg-7 col-4  px-md-0 px-4  d-flex align-items-center  justify-content-md-around justify-content-end text-white  ">
            <Link to='landing_section'
              activeClass="border border-top-0 border-start-0 border-end-0 px-2 border-4 border-warning"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500} className='d-md-flex d-none links'>Home</Link>

            <Link to='menu_section' activeClass="border border-top-0 border-start-0 border-end-0 px-2 border-4 border-warning"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500} className='d-md-flex d-none links'>Menu</Link>

            <RouteLink to="/MyOrders" className='d-md-flex d-none links'>Orders</RouteLink>

            <Link to='about_section' activeClass="border border-top-0 border-start-0 border-end-0 px-2 border-4 border-warning"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500} className='d-md-flex d-none links'>About</Link>
            <Link to='contact_section' activeClass="border border-top-0 border-start-0 border-end-0 px-2 border-4 border-warning"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500} className='d-md-flex d-none links'>Contact</Link>
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