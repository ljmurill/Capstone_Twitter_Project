import React, {useState, useEffect} from "react";
import EditModalSetUp from "../EditDeleteModal/EditModalSetUp";
import DeleteModalSetUp from "../EditDeleteModal/DeleteModalSetup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "../ModalContext/Modal";
import EllipsisModal from "./EllipsisModal";

function Ellipsis({ post }){

    const [showModal, setShowModal] = useState(false);


        // document.querySelector('.borderTopPost').addEventListener('click', closeMenu);

        // return () => document.querySelector('.borderTopPost').removeEventListener("click", closeMenu);



    // const openMenu =() => {
    //     if(menu) return;
    //     ellipsis.classList.add('ellipsisHide')
    //     setMenu(true);
    // };


    return (
        <>
            <FontAwesomeIcon icon="fa-solid fa-ellipsis" className="ellipsisColor" onClick={() => setShowModal(true)}/>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                  <EllipsisModal setShowModal={setShowModal} post={post}/>
                </Modal>
            )}
        </>
    )
}

export default Ellipsis;
