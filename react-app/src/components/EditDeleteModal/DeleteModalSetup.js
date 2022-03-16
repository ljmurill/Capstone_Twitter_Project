import React, { useState } from "react";
import { Modal } from '../ModalContext/Modal'
import DeleteModal from "./DeleteModal";




function DeleteModalSetUp({ post }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button onClick={() => setShowModal(true)}>Delete</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteModal setShowModal={setShowModal} post={post}/>
        </Modal>
      )}
    </>
  );
}

export default DeleteModalSetUp;
