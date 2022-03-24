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

    const handleError =(e) => {
        e.target.src = 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found-300x169.jpg'
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
                            {post.image && <p>Image: {post.image}</p>}
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
                                name="tweet"
                                className="inputHomePage"
                                placeholder="Image (optional)"
                                onChange={(e)=> setImage(e.target.value)}
                                value={image}
                                ></input>
                            </div>
                        </form>
                        <div className="buttonHomePageDiv">
                            <button type="submit" className="jotButtonOnHomePage" onClick={handleSubmit}>Reply</button>
                        </div>
                </div>
            </div>
            {/* <div>
                <img className='profilePic' src={currentUser.profile_pic ? currentUser.profile_pic: defaultProfilePic} onError={handleError}/>
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
            </div> */}

        </>
    )
}

export default CreateComment;
