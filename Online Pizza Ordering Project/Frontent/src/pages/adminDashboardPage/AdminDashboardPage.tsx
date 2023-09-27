import "./admin.css"
import { useRef, memo } from 'react';
import DashboardSection from "./dashboardSection/DashboardSection";
import OrdersSection from "./ordersSection/OrdersSection";
import MenuSection from "./menuSection/MenuSection";
import LogoutBtn from "./components/LogoutBtn";

const AdminDashboardPage: React.FC = () => {
    const sidebar = useRef<HTMLDivElement>(null)
    const ordersSection = useRef<HTMLDivElement>(null);
    const menusSection = useRef<HTMLDivElement>(null);
    const dashboardSection = useRef<HTMLDivElement>(null);

    const controlDifferentSection = (targetSection: any) => {
        if (ordersSection.current && menusSection.current && dashboardSection.current) {
            ordersSection.current.style.display = "none";
            menusSection.current.style.display = "none";
            dashboardSection.current.style.display = "none";
            targetSection.current.style.display = "block"
        }
        controlSidebar(false)
    }

    const controlSidebar = (action: boolean) => {
        if (sidebar.current) {
            if (action) {
                sidebar.current.style.left = "0px";
            } else {
                sidebar.current.style.left = "-250px"
            }
        }
    }

    return (
        <div className='w-100  admin_dashboard ' >
            <div className=" d-lg-none">
                <button className="btn btn-dark ms-2 mt-1 " style={{ position: "fixed" }} onClick={() => controlSidebar(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                    </svg>
                </button>
            </div>
            <div className="row w-100 h-100 m-0 p-0 ">
                <div className="col-lg-2  bg-dark sidebar_section" ref={sidebar}>
                    <div className="d-flex justify-content-end d-lg-none mt-2 me-2" data-bs-theme="dark">
                        <button type="button" onClick={() => controlSidebar(false)} className="btn-close" aria-label="Close"></button>
                    </div>
                    <div>
                        <h1 className="text_light fs-2 pt-dm-3 text-center ">
                            Pizza Hub
                        </h1>
                        <p className=" fw-bold text-center text-danger">
                            admin pannel
                        </p>
                        <div className="d-flex justify-content-center">
                            <LogoutBtn />
                        </div>
                        <hr className="text-light" />
                    </div>
                    <div className="w-100 mt-5 d-flex flex-column ">
                        <button onClick={() => controlDifferentSection(dashboardSection)} className="btn  btn-dark w-100 d-flex justify-content-start text_light fw-bold align-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-speedometer me-2 ms-4" viewBox="0 0 16 16">
                                <path d="M8 2a.5.5 0 0 1 .5.5V4a.5.5 0 0 1-1 0V2.5A.5.5 0 0 1 8 2zM3.732 3.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 8a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 7.31A.91.91 0 1 0 8.85 8.569l3.434-4.297a.389.389 0 0 0-.029-.518z" />
                                <path fillRule="evenodd" d="M6.664 15.889A8 8 0 1 1 9.336.11a8 8 0 0 1-2.672 15.78zm-4.665-4.283A11.945 11.945 0 0 1 8 10c2.186 0 4.236.585 6.001 1.606a7 7 0 1 0-12.002 0z" />
                            </svg> Dashboard
                        </button>
                        <button onClick={() => controlDifferentSection(menusSection)} className="btn my-3 btn-dark w-100 text_light fw-bold d-flex justify-content-start align-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-menu-up ms-4 me-2" viewBox="0 0 16 16">
                                <path d="M7.646 15.854a.5.5 0 0 0 .708 0L10.207 14H14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3.793l1.853 1.854zM1 9V6h14v3H1zm14 1v2a1 1 0 0 1-1 1h-3.793a1 1 0 0 0-.707.293l-1.5 1.5-1.5-1.5A1 1 0 0 0 5.793 13H2a1 1 0 0 1-1-1v-2h14zm0-5H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v2zM2 11.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 0-1h-8a.5.5 0 0 0-.5.5zm0-4a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11a.5.5 0 0 0-.5.5zm0-4a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 0-1h-6a.5.5 0 0 0-.5.5z" />
                            </svg>  Menu
                        </button>
                        <button onClick={() => controlDifferentSection(ordersSection)} className="btn btn-dark w-100 text_light fw-bold d-flex justify-content-start align-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-border-width ms-4 me-2" viewBox="0 0 16 16">
                                <path d="M0 3.5A.5.5 0 0 1 .5 3h15a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-2zm0 5A.5.5 0 0 1 .5 8h15a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1zm0 4a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z" />
                            </svg>  Orders
                        </button>
                    </div>
                </div>
                <div className="col-lg-10 h-100   col-12  border border-dark" style={{ height: "100vh", overflowY: "scroll" }}>
                    <div className="" ref={dashboardSection}>
                        <DashboardSection />
                    </div>
                    <div className="" style={{ display: "none" }} ref={menusSection}>
                        <MenuSection />
                    </div>
                    <div className="" style={{ display: "none" }} ref={ordersSection}>
                        <OrdersSection />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(AdminDashboardPage)