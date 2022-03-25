import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getComments, createComment, getFeedPosts, profilePostsComments, totalPosts } from "../store/post";
import NavBar from "./NavBar";
import Ellipsis from "./Home/Ellipsis";
import CreateCommentSetUp from "./EditDeleteModal/createCommentSetUp";


const defaultProfilePic = 'https://www.alphr.com/wp-content/uploads/2020/10/twitter.png';


function SpecificPost(){
    const [comment, setComment] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const {postId} = useParams();


    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.session.user)
    const post = useSelector(state => state.post[postId])

    const comments = useSelector(state => state.post[postId].comments);



    useEffect(() => {
        dispatch(getComments(postId))
    }, [dispatch, postId])

    const handleSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('comment', comment)
        formData.append('image', image)
        formData.append('user_id', currentUser.id)
        formData.append('post_id', postId)
        formData.append('username', currentUser.username)
        setImageLoading(true);
        // const newComment = {
        //     comment,
        //     image,
        //     user_id: currentUser.id,
        //     post_id: postId,
        //     username: currentUser.username,
        //     profile_pic: currentUser.profile_pic
        // }

        const result = await dispatch(createComment(formData))

        if (result){
            setErrors(result)
            setImageLoading(false)
        }else{
            setImagePreview(null)
            setImageLoading(false)
            setComment('')
            setImage(null)
            setErrors([])
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
            reader.close()
        }
    }


    return(
        <div className="homeFeedLayout">
            <NavBar />
            <div className="border">
            <div className="HomeTitleHomePage"><h2>Jot</h2></div>
                <div className="homeFeedHiddenScroll">
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

                            {post.user_id === currentUser.id && <Ellipsis post={post}/>}

                        </div>
                        <div>
                            <p className="pElementHome">{post.tweet}</p>
                            {post.image ? <img className='tweetImageOnHome' src={post.image} onError={handleError}/>: ''}
                        </div>
                        <div>
                            <CreateCommentSetUp post={post}/>
                        </div>
                    </div>
                </div>
                <div className="formProfilePicPostPage">
                    <div className="imageAndFormPostPage">
                        <img className='profilePicTopHome' src={currentUser.profile_pic ? currentUser.profile_pic: defaultProfilePic} onError={handleError}/>
                        <div className="postPageFormInputFileButton">
                            <form onSubmit={handleSubmit}>
                                <div className='postErrors'>
                                    {errors.map((error, ind) => (
                                        <div key={ind}>{error}</div>
                                        ))}
                                </div>
                                <div>
                                    <input
                                    name="tweet"
                                    className="inputHomePage"
                                    placeholder="Jot your reply"
                                    onChange={(e)=> setComment(e.target.value)}
                                    value={comment}
                                    ></input>
                                </div>
                                <div>
                                <input
                                    id='commentChooseFileInput'
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
                            <div className="buttonPostPageDivNoBorder">
                                <label htmlFor='commentChooseFileInput'><FontAwesomeIcon className="colorOfImageIcon" icon="fa-solid fa-image"/></label>
                                <button type="submit" className="jotButtonOnHomePage" onClick={handleSubmit}>Reply</button>
                            </div>
                        </div>
                    </div>



                </div>
                        {comments && comments.map((comment, i) => (
                            <div className='overAllTweetDiv' key={i}>

                            <>
                                <div className='borderTopPost' >
                                    <div>
                                        <img className='profilePicTopHome' src={comment.profile_pic ? comment.profile_pic: defaultProfilePic} onError={handleError}/>
                                    </div>
                                    <div className="rightSideOfTweetHome">
                                        <div className="tweetUsernameEditDeleteDiv">
                                            <div className="usernameAtUsernameDiv">
                                                <p className="pElementHomePostUsername">{comment.username}</p>
                                                <span className="pElementAtUserName">@{comment.username}</span>
                                            </div>

                                            {comment.user_id === currentUser.id && <Ellipsis post={comment}/>}

                                        </div>
                                        <div>
                                            <p className="pElementHome">{comment.comment}</p>
                                            {comment.image ? <img className='tweetImageOnHome' src={comment.image} onError={handleError}/>: ''}
                                        </div>
                                    </div>
                                </div>
                            </>
                        </div>

                        ))}
                    </div>
            </div>
        </div>
    )
}

export default SpecificPost;
