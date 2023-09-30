
import { memo } from "react"
import {logoutFunction } from "../../../store/slices/authSlice"
import { useDispatch } from "react-redux"

const LogoutBtn: React.FC = () => {
    const dispatch = useDispatch<any>()
    const handleLogout = () => {
        dispatch(logoutFunction())
    }
    return (
        <button className="btn btn-danger py-0  text-light " onClick={handleLogout}>logout</button>
    )
}

export default memo(LogoutBtn)