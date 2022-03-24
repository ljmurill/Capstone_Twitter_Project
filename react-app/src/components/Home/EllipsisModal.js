import React from "react";
import EditModalSetUp from "../EditDeleteModal/EditModalSetUp";
import DeleteModalSetUp from "../EditDeleteModal/DeleteModalSetup";

function EllipsisModal({post, setShowModal}){

    return(
        <div className="EllipsisModalButtons">
            <EditModalSetUp post={post} setShowModalEllipsis={setShowModal}/>
            {/* <h3>or</h3> */}
            <DeleteModalSetUp post={post} setShowModalEllipsis={setShowModal}/>
        </div>
    )
}

export default EllipsisModal;
