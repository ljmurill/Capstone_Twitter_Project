import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { commentDislike, commentLike, postDislike, postLike } from "../store/likes";

function Likes({ post }){
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const [commentNum, setCommentLikes] = useState({})
    const [postNum, setPostLikes] = useState({})



    // useEffect(() => {
    //     if(post.hasOwnProperty('comment')){
    //         (async () => {
    //             const response = await fetch(`/likes/${post.id}/comment`);
    //             const commentLikes = await response.json();
    //             setCommentLikes(commentLikes);

    //           })();
    //     }else{
    //         (async () => {
    //             const response = await fetch(`/likes/${post.id}/post`);
    //             const postLikes = await response.json();
    //             setPostLikes(postLikes);

    //           })();
    //     }
    // },[dispatch, post.id])

    const handleLike =async()=>{
        if (post.hasOwnProperty('comment')){
            await dispatch(commentLike(post.id))
        }else{
            await dispatch(postLike(post.id))
        }
    }

    const handleDisLike =async()=>{
        if (post.hasOwnProperty('comment')){
            await dispatch(commentDislike(post.id))
        }else{
            await dispatch(postDislike(post.id))
        }
    }



    return(
        <>
        {post.hasOwnProperty('comment') ?
            <div>
                {!commentNum[currentUser.id] && <FontAwesomeIcon icon="fa-regular fa-heart" onClick={handleLike}/>}
                {commentNum[currentUser.id] && <FontAwesomeIcon icon="fa-regular fa-heart heartColor" onClick={handleDisLike}/>}
            </div> :
            <div>
                {!postNum[currentUser.id] && <FontAwesomeIcon icon="fa-regular fa-heart" onClick={handleLike}/>}
                {postNum[currentUser.id] && <FontAwesomeIcon icon="fa-regular fa-heart heartColor" onClick={handleDisLike}/>}
            </div>
            }
        </>
    )
}

export default Likes;
