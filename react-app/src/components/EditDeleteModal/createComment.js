import React,{useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllComments } from "../../store/comment";
import { createComment, getComments } from "../../store/post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const defaultProfilePic = 'https://www.alphr.com/wp-content/uploads/2020/10/twitter.png';

function CreateComment({post, setShowModal}){
    const [comment, setComment] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageLoading, setImageLoading] = useState(null);
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getComments(post.id))
    }, [dispatch, post.id])
    const handleSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('comment', comment)
        formData.append('image', image)
        formData.append('post_id', post.id)
        formData.append('user_id', currentUser.id)
        formData.append('username', currentUser.username)

        setImageLoading(true);
        // const newComment = {
        //     comment,
        //     image,
        //     user_id: currentUser.id,
        //     post_id: post.id,
        //     username: currentUser.username,
        //     profile_pic: currentUser.profile_pic
        // }

        const result = await dispatch(createComment(formData))

        if (result){
            setErrors(result)
            setImageLoading(false)
        }else{
            setImageLoading(false)
            setImagePreview(null)
            setComment('')
            setImage(null)
            setErrors([])
            setShowModal(false)
            await dispatch(getAllComments())
        }

    }

    const handleError =(e) => {
        e.target.src = 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found-300x169.jpg'
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
                <div className='borderTopPostSpecificPost' >
                    <div>
                        <img className='profilePicTopHome' src={post.profile_pic ? post.profile_pic: defaultProfilePic} onError={handleError}/>
                    </div>
                    <div className="rightSideOfTweetHome">
                        <div className="tweetUsernameEditDeleteDiv">
                            <div className="usernameAtUsernameDiv">
                                <p className="pElementHomePostUsername">{post.username}</p>
                                <span className="pElementAtUserName">@{post.username}</span>
                            </div>

                        </div>
                        <div className="getWidthOfTextCommentModal">
                            <p className="commentModalTweetSize">{post.tweet}</p>
                            {post.image && <p className="commentModalTweetSize">Image: {post.image}</p>}
                            {/* {post.image ? <img className='tweetImageOnHome' src={post.image} onError={handleError}/>: ''} */}
                        </div>
                        <div className="ReplyingMessageCommentModal">
                            <p className="pElementAtUserName">Replying to</p><span className="spanUsernameCommentModal">@{post.username}</span>
                        </div>
                    </div>
                </div>

                <div className="formProfilePicHomePage">
                <img className='profilePicTopHome' src={currentUser.profile_pic ? currentUser.profile_pic: defaultProfilePic} onError={handleError}/>
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
                                id='modalCommentChooseFileInput'
                                type="file"
                                accept="image/*"
                                name="tweet"
                                // className="inputHomePage"
                                // placeholder="Image Url (optional)"
                                onChange={updateImage}
                                hidden='hidden'
                                ></input>
                                {imagePreview &&
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
                        <label htmlFor='modalCommentChooseFileInput'><FontAwesomeIcon className="colorOfImageIcon" icon="fa-solid fa-image"/></label>
                            <button type="submit" className="jotButtonOnHomePage" onClick={handleSubmit}>Reply</button>
                        </div>
                </div>
            </div>

        </>
    )
}

export default CreateComment;
