import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteComment, deletePost, getComments } from "../../store/post";
import { useHistory } from "react-router-dom";
import './deleteEdit.css'

function DeleteModal({post, setShowModal}){
    const dispatch = useDispatch();
    const history = useHistory();
    const { userId }  = useParams();

    const handleDelete = async() => {

        if (post.hasOwnProperty('comment')){
            await dispatch(deleteComment(post.id))
            dispatch(getComments(post.post_id))
            setShowModal(false)
        }else if (userId){
            dispatch(deletePost(post.id))
            setShowModal(false)

        }else{
            dispatch(deletePost(post.id))
            setShowModal(false)
            history.push('/homefeed')
        }
    }

    return(
        <>
        {post.hasOwnProperty('comment') ?
            <div className="deleteModal">
                <h1>Delete Reply?</h1>
                <p>This can't be undone and it will be removed from your profile, and the timeline of any accounts that follow you.</p>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>:
            <div className="deleteModal">
                <h1>Delete Jot?</h1>
                <p>This can't be undone and it will be removed from your profile, and the timeline of any accounts that follow you.</p>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>}
        </>
    )
}

export default DeleteModal;
