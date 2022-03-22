import React, { useState } from "react";
import { Modal } from '../ModalContext/Modal'
import EditModal from "./EditModal";



function EditModalSetUp({ post, setShowModalEllipsis}) {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true)

  }

  return (
    <>
      <button onClick={handleClick}>Edit</button>
      {showModal && (
        <Modal onClose={() => {
          setShowModalEllipsis(false);
          setShowModal(false)}}>
          <EditModal setShowModal={setShowModal} setShowModalEllipsis={setShowModalEllipsis} post={post}/>
        </Modal>
      )}
    </>
  );
}

export default EditModalSetUp;
