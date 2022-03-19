import React, { useState } from "react";
import { Modal } from '../ModalContext/Modal'
import CreateComment from "./createComment";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';




function CreateCommentSetUp({ post }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
        <FontAwesomeIcon icon="fa-regular fa-comment" onClick={() => setShowModal(true)}/>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateComment setShowModal={setShowModal} post={post}/>
        </Modal>
      )}
    </>
  );
}

export default CreateCommentSetUp;
