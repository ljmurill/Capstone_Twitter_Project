import React, { useState } from "react";
import { Modal } from '../ModalContext/Modal';
import EditProfileModal from "./EditProfileModal";
import './editProfile.css'




function EditProfileSetUp({ user, setUser }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="EditProfileButton" onClick={() => setShowModal(true)}>Edit Profile</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditProfileModal setShowModal={setShowModal} user={user} setUser={setUser}/>
        </Modal>
      )}
    </>
  );
}

export default EditProfileSetUp;
