import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../store/post";
import { Link, useHistory } from "react-router-dom";


function DeleteModal({post, setShowModal}){
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDelete = () => {

        if (post.hasOwnProperty('comment')){

        }else{
            dispatch(deletePost(post.id))
            setShowModal(false)
            history.push('/homefeed')
        }
    }

    return(
        <>
            <div>
                <h1>Delete Jot?</h1>
                <p>This can't be undone and it will be removed from your profile, and the timeline of any accounts that follow you.</p>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
        </>
    )
}

export default DeleteModal;
