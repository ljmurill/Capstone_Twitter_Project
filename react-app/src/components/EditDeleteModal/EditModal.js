import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePost } from "../../store/post";

function EditModal({post, setShowModal}){
    const [tweet, setTweet] = useState(post.tweet);
    const [image, setImage] = useState(post.image);
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();

    const handleEdit =async(e)=>{
        e.preventDefault();


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

    return(
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
                name="tweet"
                placeholder="Image (optional)"
                onChange={(e)=> setImage(e.target.value)}
                value={(image === null) ? '': image}
                ></input>
            </div>
            <button type="submit">Jot</button>
        </form>
    )
}

export default EditModal;
