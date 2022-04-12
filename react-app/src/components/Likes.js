import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { commentDislike, commentLike, postDislike, postLike } from "../store/likes";

function Likes({ post }){
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const [commentNum, setCommentLikes] = useState({})
    const [postNum, setPostLikes] = useState({})



    useEffect(() => {
        if(post.hasOwnProperty('comment')){
            (async () => {
                const response = await fetch(`/likes/${post.id}/comment`);
                const commentLikes = await response.json();
                setCommentLikes(commentLikes);

              })();
        }else{
            (async () => {
                const response = await fetch(`/likes/${post.id}/post`);
                const postLikes = await response.json();
                setPostLikes(postLikes);

              })();
        }
    },[])

    const handleLike =async()=>{
        if (post.hasOwnProperty('comment')){
            await dispatch(commentLike(post.id))

            const response = await fetch(`/likes/${post.id}/comment`);
            const commentLikes = await response.json();
            setCommentLikes(commentLikes);

        }else{
            await dispatch(postLike(post.id))

            const response = await fetch(`/likes/${post.id}/post`);
            const postLikes = await response.json();
            setPostLikes(postLikes);


        }
    }

    const handleDisLike =async()=>{
        if (post.hasOwnProperty('comment')){
            await dispatch(commentDislike(post.id))

            const response = await fetch(`/likes/${post.id}/comment`);
            const commentLikes = await response.json();
            setCommentLikes(commentLikes);

        }else{
            await dispatch(postDislike(post.id))

            const response = await fetch(`/likes/${post.id}/post`);
            const postLikes = await response.json();
            setPostLikes(postLikes);


        }
    }



    return(
        <>
        {post.hasOwnProperty('comment') ?
            <div className="postIcons">
                {!commentNum[currentUser.id] && <FontAwesomeIcon icon="fa-regular fa-heart" onClick={handleLike}/>}
                {commentNum[currentUser.id] && <FontAwesomeIcon icon="fa-solid fa-heart" className='heartColor' onClick={handleDisLike}/>}
                {Object.keys(commentNum).length ? Object.keys(commentNum).length : ''}
            </div> :
            <div className="postIcons">
                {!postNum[currentUser.id] && <FontAwesomeIcon icon="fa-regular fa-heart" onClick={handleLike}/>}
                {postNum[currentUser.id] && <FontAwesomeIcon icon="fa-solid fa-heart" className='heartColor' onClick={handleDisLike}/>}
                {Object.keys(postNum).length ? Object.keys(postNum).length : ''}
            </div>
            }
        </>
    )
}

export default Likes;
