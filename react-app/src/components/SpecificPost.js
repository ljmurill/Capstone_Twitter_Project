import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import EditModalSetUp from "./EditDeleteModal/EditModalSetUp";
import DeleteModalSetUp from "./EditDeleteModal/DeleteModalSetup";
import { getComments, createComment } from "../store/post";


const defaultProfilePic = 'https://www.alphr.com/wp-content/uploads/2020/10/twitter.png';


function SpecificPost(){
    const [comment, setComment] = useState('');
    const [image, setImage] = useState('');
    const [errors, setErrors] = useState([]);
    const {postId} = useParams();
    console.log(postId, 'TIMEEE')
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.session.user)
    const post = useSelector(state => state.post[postId])
    const comments = useSelector(state => state.post[postId].comments);
    console.log(comments, 'sdafdsafdasfdas')

    useEffect(() => {
        dispatch(getComments(postId))
    }, [dispatch, postId])

    const handleSubmit = async(e) => {
        e.preventDefault();

        const newComment = {
            comment,
            image,
            user_id: currentUser.id,
            post_id: postId,
            username: currentUser.username,
            profile_pic: currentUser.profile_pic
        }

        const result = await dispatch(createComment(newComment))

        if (result){
            setErrors(result)
        }else{
            setComment('')
            setImage('')
            setErrors([])
        }

    }

    return(
        <>
            <h2>Jot</h2>
            <img className='profilePic' src={post.profile_pic ? post.profile_pic: defaultProfilePic}/>
            {post.username}
            {post.tweet}
            <img src={post.image}/>
            <EditModalSetUp post={post}/>
            <DeleteModalSetUp post={post}/>
            <div>
                <img className='profilePic' src={currentUser.profile_pic ? currentUser.profile_pic: defaultProfilePic}/>
                <form onSubmit={handleSubmit}>
                    <div className='postErrors'>
                        {errors.map((error, ind) => (
                            <div key={ind}>{error}</div>
                            ))}
                    </div>
                    <div>
                        <input
                        name="tweet"
                        placeholder="What's happening?"
                        onChange={(e)=> setComment(e.target.value)}
                        value={comment}
                        ></input>
                    </div>
                    <div>
                        <input
                        name="tweet"
                        placeholder="Image (optional)"
                        onChange={(e)=> setImage(e.target.value)}
                        value={image}
                        ></input>
                    </div>
                    <button type="submit">Reply</button>
                </form>
            </div>
            <div className="homeFeedHiddenScroll">
                    {comments && comments.map((comment, i) => (
                        // <Link key={i} to={`/posts/${post.id}`}>
                        <div key={i}>

                            <img className='profilePic' src={comment.profile_pic ? comment.profile_pic: defaultProfilePic}/>
                            {comment.username}
                            {comment.comment}
                            <img src={comment.image}/>

                            <div>
                                <EditModalSetUp post={comment}/>
                                <DeleteModalSetUp post={comment}/>
                            </div>
                        </div>

                    ))}
                </div>
        </>
    )
}

export default SpecificPost;
