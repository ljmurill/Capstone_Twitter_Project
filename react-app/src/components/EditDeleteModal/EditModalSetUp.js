import React, { useState } from "react";
import { Modal } from '../ModalContext/Modal'
import EditModal from "./EditModal";



function EditModalSetUp({ post }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditModal setShowModal={setShowModal} post={post}/>
        </Modal>
      )}
    </>
  );
}

export default EditModalSetUp;
