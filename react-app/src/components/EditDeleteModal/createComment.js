import React,{useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllComments } from "../../store/comment";
import { createComment, getComments } from "../../store/post";

const defaultProfilePic = 'https://www.alphr.com/wp-content/uploads/2020/10/twitter.png';

function CreateComment({post, setShowModal}){
    const [comment, setComment] = useState('');
    const [image, setImage] = useState('');
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getComments(post.id))
    }, [dispatch, post.id])
    const handleSubmit = async(e) => {
        e.preventDefault();
        const newComment = {
            comment,
            image,
            user_id: currentUser.id,
            post_id: post.id,
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
            setShowModal(false)
            await dispatch(getAllComments())
        }

    }

    return(
        <>
            <div>
                <img className='profilePic' src={post.profile_pic ? post.profile_pic: defaultProfilePic}/>
                {post.username}
                {post.tweet}
                <img src={post.image}/>
            </div>
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

        </>
    )
}

export default CreateComment;
