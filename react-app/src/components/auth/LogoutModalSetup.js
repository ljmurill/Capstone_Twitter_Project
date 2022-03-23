import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from '../ModalContext/Modal'
import LogoutButton from "./LogoutButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../splashHomeNav.css'


const defaultProfilePic = 'https://www.alphr.com/wp-content/uploads/2020/10/twitter.png';

function LogoutModalSetUp() {
  const [showModal, setShowModal] = useState(false);
  const currentUser = useSelector(state => state.session.user);
  const handleError =(e) => {
    e.target.src = 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found-300x169.jpg'
  }

  return (
    <>
    <div className='allLogoutSection' onClick={() => setShowModal(true)}>
        <div className="leftLogOutSection">
            <img className="profilePic" src={currentUser.profile_pic ? currentUser.profile_pic: defaultProfilePic} onError={handleError}/>
            <div>
                <div>{currentUser.username}</div>
                <div>@{currentUser.username}</div>
            </div>
        </div>
        <FontAwesomeIcon icon="fa-solid fa-ellipsis" className="ellipsisColor"/>

    </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LogoutButton setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default LogoutModalSetUp;
