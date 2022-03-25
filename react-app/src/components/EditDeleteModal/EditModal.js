import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePost, updateComment } from "../../store/post";
import { getComments } from "../../store/post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const defaultProfilePic = 'https://www.alphr.com/wp-content/uploads/2020/10/twitter.png';

function EditModal({post, setShowModal, setShowModalEllipsis}){
    const [tweet, setTweet] = useState(post.tweet);
    const [image, setImage] = useState(post.image);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageLoading, setImageLoading] = useState(null);
    const [comment, setComment] = useState(post.comment);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    const handleError =(e) => {
        e.target.src = 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found-300x169.jpg'
      }

    const handleEdit =async(e)=>{
        e.preventDefault();
        if(post.hasOwnProperty('comment')){
            const formData = new FormData();

            formData.append('image', image)
            formData.append('comment', comment)
            setImageLoading(true);
                const result = await dispatch(updateComment(post.id, formData));

                if(result){
                    setErrors(result);
                    setImageLoading(false)

                }else{
                    setImagePreview(null)
                    setImageLoading(false)
                    setImage(null)
                    setErrors([])
                    dispatch(getComments(post.post_id))
                    setShowModal(false);
                    setShowModalEllipsis(false);
                }


        }else{
            const formData = new FormData();

            formData.append('image', image)
            formData.append('tweet', tweet)
            setImageLoading(true);
                const result = await dispatch(updatePost(post.id, formData));

                if(result){
                    setErrors(result);
                    setImageLoading(false)

                }else{
                    setImagePreview(null)
                    setImageLoading(false)
                    setImage(null)
                    setErrors([])
                    dispatch(getComments(post.id))
                    setShowModal(false);
                    setShowModalEllipsis(false);
                }
        }
    }


    const updateImage = (e) => {
        if (e.target.files && e.target.files.length > 0){
            const reader = new FileReader();
            const file = e.target.files[0];
            setImage(file);
            reader.readAsDataURL(file)
            reader.addEventListener('load', () => {
                setImagePreview(reader.result)
            })

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
                            <form className="formhomeWithInputsAndErrors" onSubmit={handleEdit}>
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
                                    id='modalChooseFileInput'
                                    type="file"
                                    accept="image/*"
                                    name="tweet"
                                    // className="inputHomePage"
                                    // placeholder="Image Url (optional)"
                                    onChange={updateImage}
                                    hidden='hidden'
                                    ></input>
                                    {image && image === post.image &&
                                    <>
                                    <div className="xOnImagePreview" onClick={() => setImage(null)}>
                                    <FontAwesomeIcon icon="fa-solid fa-xmark" />
                                    </div>
                                    <img className='imagePreview' src={image}/>
                                    </>
                                    }
                                    {image !== post.image && imagePreview &&
                                    <>
                                        <div className="xOnImagePreview" onClick={() => {
                                            setImage(null)
                                            setImagePreview(null)
                                        }}>
                                        <FontAwesomeIcon icon="fa-solid fa-xmark" />
                                        </div>
                                        <img className='imagePreview' src={imagePreview}/>
                                    </>}

                                </div>

                            </form>
                            <div className="buttonHomePageDiv">
                            <label htmlFor='modalChooseFileInput'><FontAwesomeIcon className="colorOfImageIcon" icon="fa-solid fa-image"/></label>
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
                        <form className="formhomeWithInputsAndErrors" onSubmit={handleEdit}>
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
                                id='modalChooseFileInput'
                                type="file"
                                accept="image/*"
                                name="tweet"
                                // className="inputHomePage"
                                // placeholder="Image Url (optional)"
                                onChange={updateImage}
                                hidden='hidden'
                                ></input>
                                {image === post.image && image &&
                                <>
                                <div className="xOnImagePreview" onClick={() => {
                                    setImage(null)
                                }}>
                                <FontAwesomeIcon icon="fa-solid fa-xmark" />
                                </div>
                                <img className='imagePreview' src={image}/>
                                </>
                                }
                                {image !== post.image && imagePreview &&
                                <>
                                    <div className="xOnImagePreview" onClick={() => {
                                        setImage(null)
                                        setImagePreview(null)
                                    }}>
                                    <FontAwesomeIcon icon="fa-solid fa-xmark" />
                                    </div>
                                    <img className='imagePreview' src={imagePreview}/>
                                </>}

                            </div>
                        </form>
                        <div className="buttonHomePageDiv">
                        <label htmlFor='modalChooseFileInput'><FontAwesomeIcon className="colorOfImageIcon" icon="fa-solid fa-image"/></label>
                            <button type="submit" className="updateJotButtonUpdateModal" onClick={handleEdit}>Update Jot</button>
                        </div>
                </div>
            </div>
        </>}
        </>
    )
}

export default EditModal;
