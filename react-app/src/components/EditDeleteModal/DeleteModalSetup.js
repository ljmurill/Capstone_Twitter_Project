import React, { useState } from "react";
import { Modal } from '../ModalContext/Modal'
import DeleteModal from "./DeleteModal";




function DeleteModalSetUp({ post, setShowModalEllipsis }) {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true)

  }
  return (
    <>
      <button className='EllipsisButtonModal' onClick={handleClick}>Delete</button>
      {showModal && (
        <Modal onClose={() => {
          setShowModalEllipsis(false);
          setShowModal(false)}}>
          <DeleteModal setShowModal={setShowModal} setShowModalEllipsis={setShowModalEllipsis} post={post}/>
        </Modal>
      )}
    </>
  );
}

export default DeleteModalSetUp;
