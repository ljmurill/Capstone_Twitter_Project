import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePost, updateComment } from "../../store/post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getComments } from "../../store/post";

const defaultProfilePic = 'https://www.alphr.com/wp-content/uploads/2020/10/twitter.png';

function EditModal({post, setShowModal, setShowModalEllipsis}){
    const [tweet, setTweet] = useState(post.tweet);
    const [image, setImage] = useState(post.image);
    const [comment, setComment] = useState(post.comment);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    const handleError =(e) => {
        e.target.src = 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found-300x169.jpg'
      }

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
                    setShowModalEllipsis(false);
                    dispatch(getComments(post.id))
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
                    setShowModalEllipsis(false);

                }
        }
    }

    return(
        <>
            {post.hasOwnProperty('comment') ?
                <>
                <FontAwesomeIcon icon="fa-solid fa-xmark" className='xmarkOnJotModal' onClick={() => {
                    setShowModalEllipsis(false)
                    setShowModal(false)}}/>
                <div className="formProfilePicHomePage">
                    <img className='profilePicTopHome' src={post.profile_pic ? post.profile_pic: defaultProfilePic} onError={handleError}/>
                    <div className="formAndButtonDiv">
                            <form className="formhomeWithInputsAndErrors">
                                <div className='postErrors'>
                                    {errors.map((error, ind) => (
                                        <div key={ind}>{error}</div>
                                        ))}
                                </div>
                                <div>
                                    <input
                                    className="inputHomePage"
                                    name="comment"
                                    placeholder="Jot your reply"
                                    onChange={(e)=> setComment(e.target.value)}
                                    value={comment}
                                    ></input>
                                </div>
                                <div>
                                    <input
                                    name="tweet"
                                    className="inputHomePage"
                                    placeholder="Image Url (optional)"
                                    onChange={(e)=> setImage(e.target.value)}
                                    value={image}
                                    ></input>
                                </div>
                            </form>
                            <div className="buttonHomePageDiv">
                                <button type="submit" className="updateJotButtonUpdateModal" onClick={handleEdit}>Update Reply</button>
                            </div>
                    </div>
                </div>
            </> :
                <>
            <FontAwesomeIcon icon="fa-solid fa-xmark" className='xmarkOnJotModal' onClick={() => {
                setShowModalEllipsis(false)
                setShowModal(false)}}/>
            <div className="formProfilePicHomePage">
                <img className='profilePicTopHome' src={post.profile_pic ? post.profile_pic: defaultProfilePic} onError={handleError}/>
                <div className="formAndButtonDiv">
                        <form className="formhomeWithInputsAndErrors">
                            <div className='postErrors'>
                                {errors.map((error, ind) => (
                                    <div key={ind}>{error}</div>
                                    ))}
                            </div>
                            <div>
                                <input
                                className="inputHomePage"
                                name="tweet"
                                placeholder="What's happening?"
                                onChange={(e)=> setTweet(e.target.value)}
                                value={tweet}
                                ></input>
                            </div>
                            <div>
                                <input
                                name="tweet"
                                className="inputHomePage"
                                placeholder="Image Url (optional)"
                                onChange={(e)=> setImage(e.target.value)}
                                value={image}
                                ></input>
                            </div>
                        </form>
                        <div className="buttonHomePageDiv">
                            <button type="submit" className="updateJotButtonUpdateModal" onClick={handleEdit}>Update Jot</button>
                        </div>
                </div>
            </div>
        </>}
        </>
    )
}

export default EditModal;
