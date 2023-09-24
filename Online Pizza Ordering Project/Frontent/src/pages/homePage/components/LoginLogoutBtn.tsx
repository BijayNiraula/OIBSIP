import { Dropdown } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { memo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GlobalStateInterface } from '../../../utilities/interfaces/interface';
import { logoutFunction } from "../../../store/slices/authSlice";
import defaultProfilePic from "../../../assets/profile.jpg"
const LoginLogoutBtn: React.FC = () => {
  const navigate = useNavigate()
  const dispatch: any = useDispatch()
  const img = useSelector((state: GlobalStateInterface) => state.auth.data.img);
  const authenticated = useSelector((state: GlobalStateInterface) => state.auth.authenticated)

  const logoutHandler = () => {
    dispatch(logoutFunction())
  }

  return (
    <Dropdown>
      <Dropdown.Toggle variant="dark" id="dropdown-basic" className="login_logout_btn">
       
        {
          authenticated ?
            <img className='img-fluid rounded-circle ' width={40} height={40} src={img} alt="profile_img" />
            :
            <img className='img-fluid rounded-circle ' width={40} height={40} src={defaultProfilePic} alt="profile_img" />
        }

        <div className="d-flex justify-content-center d-md-none">
          <br />
        
          {
            authenticated ?
              <Link to="/" onClick={logoutHandler} className="btn btn-danger mt-2 py-0 ">
                Logout
              </Link> :
              <Link to="/login" className="btn btn-danger mt-2 py-0 ">
                Login
              </Link>
          }

        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu className=" border border-light">
      
        {
          authenticated ?
            <Dropdown.Item onClick={logoutHandler} className="d-none d-md-block" > Logout </Dropdown.Item>
            :
            <Dropdown.Item onClick={() => navigate("/login")} className="d-none d-md-block" > Login </Dropdown.Item>
        }
        
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default memo(LoginLogoutBtn)