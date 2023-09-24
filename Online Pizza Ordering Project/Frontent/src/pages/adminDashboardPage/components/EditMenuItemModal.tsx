import { Modal } from "react-bootstrap";
import { Fragment, memo, useRef } from "react"
import { useSelector, useDispatch } from "react-redux";
import { hideModal } from "../../../store/slices/controlEditMenuModalSlice";
import { GlobalStateInterface } from "../../../utilities/interfaces/interface";
import { editMenuItemFunction } from "../../../store/slices/menuSlice";
import ReactLoading from 'react-loading';

const EditMenuItemModal = () => {

  const { modalState, data } = useSelector((state: GlobalStateInterface) => state.controlEditMenuModal)
  const loadingBtn = useRef<any>();
  const saveBtn = useRef<any>();
  const dispatch: any = useDispatch()

  const handleClose = () => {
    dispatch(hideModal())
  }

  const handleEditMenuItem = async (e: any) => {
    if (e) {
      e.preventDefault();
      loadingBtn.current.style.display = "flex"
      saveBtn.current.style.display = "none"
      const pizzaName = e.target[0].value;
      const price = e.target[1].value;
      const stock = e.target[2].value;
      const type = e.target[3].value;
      const size = e.target[4].value;
      const description = e.target[5].value;
      const result = await dispatch(editMenuItemFunction({ _id: data._id, pizzaName, price, stock, type, size, description }))
      if (result) {
        handleClose()
        return;
      }
      loadingBtn.current.style.display = "none"
      saveBtn.current.style.display = "flex"
    }
  }

  return (
    <Fragment>
      <Modal
        show={modalState}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Menu Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleEditMenuItem} action="" className="row">
            <div className="row">
              <label htmlFor="name" className="col-4">pizza name : </label>
              <input required type="text" id="name" defaultValue={data.pizzaName} className="col-8" />
            </div>
            <div className="row mt-2">
              <label htmlFor="price" className="col-4">price : </label>
              <input required type="number" id="price" min={0} step={0.1} defaultValue={data.price} className="col-8" />
            </div>
            <div className="row mt-2">
              <label htmlFor="price" className="col-4">stock : </label>
              <input required type="number" id="stock" min={0} defaultValue={data.stock} className="col-8" />
            </div>
            <div className="row mt-2">
              <label htmlFor="type" className="col-4">type : </label>
              <select required name="" className="col-8" id="type">
                <option value="veg" selected={data.type === "veg" ? true : false}> veg</option>
                <option value="non-veg" selected={data.type === "non-veg" ? true : false} >non-veg</option>
              </select>
            </div>
            <div className="row mt-2">
              <label htmlFor="size" className="col-4">size : </label>
              <input required type="text" id="size" defaultValue={data.size} className="col-8" />
            </div>
            <div className="row mt-2">
              <label htmlFor="description" className="col-4">description : </label>
              <textarea required defaultValue={data.description} name="" id="description" className="col-8"></textarea>
            </div>
            <div className="mt-4 d-flex justify-content-center">
              <button className="btn btn-success px-4" ref={saveBtn} >
                save
              </button>
              <button disabled className="btn btn-success  px-4  justify-content-center align-items-center" ref={loadingBtn} style={{ display: "none" }} >
                <ReactLoading type="spokes" className="d-flex justify-content-center align-items-center me-2" color={"#ffff"} height={'20px'} width={'20px'} />
                loading
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}


export default memo(EditMenuItemModal)