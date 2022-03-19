import React, { useState } from "react";
import { Modal } from '../ModalContext/Modal';
import JotModal from "./JotModal";




function JotModalSetUp({ user }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button onClick={() => setShowModal(true)}>Jot</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <JotModal setShowModal={setShowModal} user={user}/>
        </Modal>
      )}
    </>
  );
}

export default JotModalSetUp;
