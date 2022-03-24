import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteComment, deletePost, getComments } from "../../store/post";
import { useHistory } from "react-router-dom";
import './deleteEdit.css'

function DeleteModal({post, setShowModal, setShowModalEllipsis}){
    const dispatch = useDispatch();
    const history = useHistory();
    const { userId }  = useParams();

    const handleDelete = async() => {

        if (post.hasOwnProperty('comment')){
            await dispatch(deleteComment(post.id))
            dispatch(getComments(post.post_id))
            setShowModal(false)
            setShowModalEllipsis(false);
        }else if (userId){
            dispatch(deletePost(post.id))
            setShowModal(false)
            setShowModalEllipsis(false);

        }else{
            dispatch(deletePost(post.id))
            setShowModal(false)
            setShowModalEllipsis(false);
            history.push('/homefeed')
        }
    }

    return(
        <>
        {post.hasOwnProperty('comment') ?
            <div className='logoutModalExact'>
                <h1>Delete Reply?</h1>
                <div className='centerDivForLogOutModal'>
                <p className='pElementAtUserNameFix'>This can't be undone and it will be removed from your profile, and the timeline of any accounts that follow you.</p>
                    <div>
                        <button  className='deleteButtonOnComment' onClick={handleDelete}>Delete</button>
                    </div>
                    <div>
                        <button className='cancelDeleteButtonOnModal' onClick={() => {
                            setShowModalEllipsis(false);
                            setShowModal(false)}}>Cancel</button>
                    </div>
                </div>
            </div>:
            <div className='logoutModalExact'>
                <h1>Delete Jot?</h1>
                <div className='centerDivForLogOutModal'>
                <p className='pElementAtUserNameFix'>This can't be undone and it will be removed from your profile, and the timeline of any accounts that follow you.</p>
                    <div>
                        <button className='deleteButtonOnComment' onClick={handleDelete}>Delete</button>
                    </div>
                    <div>
                        <button  className='cancelDeleteButtonOnModal' onClick={() => {
                            setShowModalEllipsis(false);
                            setShowModal(false)}}>Cancel</button>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default DeleteModal;
