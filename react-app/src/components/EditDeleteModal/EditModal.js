import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePost, updateComment } from "../../store/post";

function EditModal({post, setShowModal}){
    const [tweet, setTweet] = useState(post.tweet);
    const [image, setImage] = useState(post.image);
    const [comment, setComment] = useState(post.comment);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    const handleEdit =async(e)=>{
        e.preventDefault();
        if(post.hasOwnProperty('comment')){
                const newComment = {
                    comment,
                    image
                }
                const result = await dispatch(updateComment(post.id, newComment));

                if(result){
                    setErrors(result);
                }else{
                    setShowModal(false);
                }


        }else{
                const newPost = {
                    tweet,
                    image
                }
                const result = await dispatch(updatePost(post.id, newPost));

                if(result){
                    setErrors(result);
                }else{
                    setShowModal(false);
                }
        }
    }

    return(
        <>
            {post.hasOwnProperty('comment') ?
                <form onSubmit={handleEdit}>
                    <div className='postErrors'>
                        {errors.map((error, ind) => (
                            <div key={ind}>{error}</div>
                            ))}
                    </div>
                    <div>
                        <input
                        name="comment"
                        placeholder="What's happening?"
                        onChange={(e)=> setComment(e.target.value)}
                        value={comment}
                        ></input>
                    </div>
                    <div>
                        <input
                        name="image"
                        placeholder="Image (optional)"
                        onChange={(e)=> setImage(e.target.value)}
                        value={(image === null) ? '': image}
                        ></input>
                    </div>
                    <button type="submit">Update Reply</button>
                </form> :
                <form onSubmit={handleEdit}>
                    <div className='postErrors'>
                        {errors.map((error, ind) => (
                            <div key={ind}>{error}</div>
                            ))}
                    </div>
                    <div>
                        <input
                        name="tweet"
                        placeholder="What's happening?"
                        onChange={(e)=> setTweet(e.target.value)}
                        value={tweet}
                        ></input>
                    </div>
                    <div>
                        <input
                        name="image"
                        placeholder="Image (optional)"
                        onChange={(e)=> setImage(e.target.value)}
                        value={(image === null) ? '': image}
                        ></input>
                    </div>
                    <button type="submit">Jot</button>
                </form>}
        </>
    )
}

export default EditModal;
