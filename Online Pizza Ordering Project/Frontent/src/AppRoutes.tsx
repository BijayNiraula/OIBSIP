import { Route, Routes, BrowserRouter } from 'react-router-dom'
import HomePage from './pages/homePage/HomePage'
import { Fragment, memo, useEffect } from 'react'
import CartsPage from './pages/cartsPage/CartsPage'
import LoginPage from './pages/loginPage/LoginPage'
import MyOrdersPage from './pages/myOrdersPage/MyOrdersPage'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import { authenticate } from './store/slices/authSlice';
import { GlobalStateInterface } from './utilities/interfaces/interface'
import { userRoles } from './utilities/enums/userRoleEnum'
import './App.css'
import AdminDashboardPage from './pages/adminDashboardPage/AdminDashboardPage'
import { useSocketContext } from './Contexts/SocketProvider'
import { Socket } from 'socket.io-client'

const AppRoutes: React.FC = () => {
    const socket: Socket | null = useSocketContext()
    const { userRole, userId } = useSelector((state: GlobalStateInterface) => state.auth.data)
    const authenticated = useSelector((state: GlobalStateInterface) => state.auth.authenticated)
    const dispatch: any = useDispatch()

    useEffect(() => {
        dispatch(authenticate())
    }, [])

    if (authenticated) {
        if (socket) {
            socket.emit("join", userId)
        }
        if (userRole === userRoles.ADMIN) {

            return (
                <Fragment>
                    <BrowserRouter>
                        <Routes>
                            <Route path="*" element={<AdminDashboardPage />} />
                        </Routes>
                    </BrowserRouter>
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    <BrowserRouter>
                        <Routes>
                            <Route path="*" element={<HomePage />} />
                            <Route path="/carts" element={<CartsPage />} />
                            <Route path="/MyOrders" element={<MyOrdersPage />} />
                        </Routes>
                    </BrowserRouter>
                </Fragment>

            )
        }
    } else {
        return (
            <Fragment>
                <BrowserRouter>
                    <Routes>
                        <Route path="*" element={<HomePage />} />
                        <Route path="/carts" element={<CartsPage />} />
                        <Route path="/MyOrders" element={<LoginPage />} />
                        <Route path="/login" element={<LoginPage />} />
                    </Routes>
                </BrowserRouter>
            </Fragment>

        )
    }
}

export default memo(AppRoutes)
