import { Button, Modal } from "react-bootstrap";
import { Fragment, useRef, useState, memo } from "react"
import { useDispatch } from "react-redux";
import { addMenuItemFunction } from "../../../store/slices/menuSlice";
import ReactLoading from 'react-loading';

const AddMenuItemModal = () => {
  const dispatch: any = useDispatch();
  const [show, setShow] = useState(false);
  const loadingBtn = useRef<any>();
  const saveBtn = useRef<any>();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddMenuItem = async (e: any) => {
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
      const result = await dispatch(addMenuItemFunction({ pizzaName, price, stock, type, size, description }))
      loadingBtn.current.style.display = "none"
      saveBtn.current.style.display = "flex"
      if (result) {
        handleClose()
      }
    }
  }

  return (
    <Fragment>
      <Button variant="success" onClick={handleShow}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-lg me-2" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
        </svg>
        Add
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Menu Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleAddMenuItem} action="" className="row">
            <div className="row">
              <label htmlFor="name" className="col-4">pizza name : </label>
              <input required type="text" id="name" className="col-8" />
            </div>
            <div className="row mt-2">
              <label htmlFor="price" className="col-4">price : </label>
              <input required type="number" id="price" min={0} step={0.1} className="col-8" />
            </div>
            <div className="row mt-2">
              <label htmlFor="price" className="col-4">stock : </label>
              <input required type="number" min={0} id="stock" className="col-8" />
            </div>
            <div className="row mt-2">
              <label htmlFor="type" className="col-4">type : </label>
              <select required name="" className="col-8" id="type">
                <option value="veg"> veg</option>
                <option value="non-veg">non-veg</option>
              </select>
            </div>
            <div className="row mt-2">
              <label htmlFor="size" className="col-4">size : </label>
              <input required type="text" id="size" className="col-8" />
            </div>
            <div className="row mt-2">
              <label htmlFor="description" className="col-4">description : </label>
              <textarea required name="" id="description" className="col-8" ></textarea>
            </div>
            <div className="mt-4 d-flex justify-content-center">
              <button className="btn btn-success px-4" ref={saveBtn}>
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


export default memo(AddMenuItemModal)