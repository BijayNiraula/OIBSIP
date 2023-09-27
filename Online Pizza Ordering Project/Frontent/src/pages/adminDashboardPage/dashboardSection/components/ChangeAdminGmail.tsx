import { memo, useRef } from "react"
import fetchData from "../../../../utilities/modules/fetchData";
import ReactLoading from 'react-loading';
import { useDispatch, useSelector } from "react-redux";
import { GlobalStateInterface } from "../../../../utilities/interfaces/interface";
import { logout } from "../../../../store/slices/authSlice";
import { errorToast, successToast } from "../../../../utilities/modules/toastMessage";

const ChangeAdminGmail = () => {
    const dispatch = useDispatch<any>()
    const loadingBtn = useRef<HTMLButtonElement>(null);
    const saveBtn = useRef<HTMLButtonElement>(null);
    const adminGmail = useSelector((state: GlobalStateInterface) => state.auth.data.email)
    const handleChangeAdminGmail = async (e: any) => {
        if (e && loadingBtn.current && saveBtn.current) {
            e.preventDefault()
            const oldAdminGmail = e.target[0].value;
            const newAdminGmail = e.target[1].value;
            const BackendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
            const result = await fetchData(`${BackendBaseUrl}/admin/changeAdminGmail`, {
                method: "PUT",
                body: JSON.stringify({ oldAdminGmail, newAdminGmail }),
                credentials: "include",
                headers: {
                    "content-type": "application/json"
                }
            });
            if (result.status === "success") {
                successToast("admin gmail has been changed")
                dispatch(logout())
            } else {
                errorToast(result.message)
            }
        }
    }
    return (
        <section className='mt-5'>
            <h4>Change Admin Gmail</h4>
            <div className="row d-flex row mt-3 justify-content- m-0 p-0">
                <form onSubmit={handleChangeAdminGmail} className="col-lg-6 col-md-8 col-sm-10 col-12 ms-md-5  shadow px-3 py-3 bg-white p-0 border">
                    <div className="row m-0 p-0">
                        <label htmlFor="newEmail" className='col-8 fw-4 m-0 p-0'>Old Gmail Address : </label>
                        <input readOnly type="email" defaultValue={adminGmail} required name="" className='col-sm-9 px-3 py-1 m-0  p-0' id="newEmail" />
                    </div>
                    <div className="row mt-2 m-0 p-0">
                        <label htmlFor="newEmail" className='col-8 fw-4 m-0 p-0 border'>New Gmail Address : </label>
                        <input type="email" required name="" className='col-sm-9 px-3 py-1 m-0  p-0' id="newEmail" />
                    </div>
                    <div className="d-flex mt-3 ">
                        <div className="mt-4 d-flex justify-content-center">
                            <button className="btn btn-success px-4 shadow" ref={saveBtn}>
                                save
                            </button>
                            <button disabled className="btn btn-success  px-4  justify-content-center align-items-center" ref={loadingBtn} style={{ display: "none" }} >
                                <ReactLoading type="spokes" className="d-flex justify-content-center align-items-center me-2" color={"#ffff"} height={'20px'} width={'20px'} />
                                loading
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default memo(ChangeAdminGmail)