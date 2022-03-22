import React from "react";
import EditModalSetUp from "../EditDeleteModal/EditModalSetUp";
import DeleteModalSetUp from "../EditDeleteModal/DeleteModalSetup";

function EllipsisModal({post, setShowModal}){

    return(
        <>
            <EditModalSetUp post={post} setShowModalEllipsis={setShowModal}/>
            <DeleteModalSetUp post={post} setShowModalEllipsis={setShowModal}/>
        </>
    )
}

export default EllipsisModal;
