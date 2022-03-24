import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { createJot, getFeedPosts } from "../../store/post";
import { useHistory } from "react-router-dom";
import NavBar from "../NavBar";
import Ellipsis from "./Ellipsis";
import './home.css'
import { getAllComments } from "../../store/comment";
import { currentUserFollow } from "../../store/follows";
import CreateCommentSetUp from "../EditDeleteModal/createCommentSetUp";
import Likes from "../Likes";

const defaultProfilePic = 'https://www.alphr.com/wp-content/uploads/2020/10/twitter.png';

function HomeFeed(){
    const [tweet, setTweet] = useState('');
    const [image, setImage] = useState('');
    const [errors, setErrors] = useState([]);

    const posts = useSelector(state => state.post);
    const currentUser = useSelector(state => state.session.user);
    const allComments = useSelector(state => state.comment.allComments);

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        document.querySelector('body').classList.remove('login')
        dispatch(getAllComments())
        dispatch(getFeedPosts())
        dispatch(currentUserFollow(currentUser.id))
    },[])

    const handleSubmit = async(e) => {
        e.preventDefault();

        const newPost = {
            tweet,
            image,
            user_id: currentUser.id,
            username: currentUser.username,
            profile_pic: currentUser.profile_pic
        }

        const result = await dispatch(createJot(newPost))

        if (result){
            setErrors(result)
        }else{
            setTweet('')
            setImage('')
            setErrors([])
            dispatch(getFeedPosts())
        }

    }

    const handleClick = (e, postId) => {
        e.preventDefault()
        history.push(`/posts/${postId}`)

    }

    const handleError =(e) => {
        e.target.src = 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found-300x169.jpg'
      }

    return(
        <div className="homeFeedLayout">

            <NavBar/>

            <div className="border">
                {/* <div className="topOfHomePage"> */}
                    <div className="HomeTitleHomePage">
                        <h2>Home</h2>
                    </div>
                    <div className="homeFeedHiddenScroll">
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
                                        <button type="submit" className="jotButtonOnHomePage" onClick={handleSubmit}>Jot</button>
                                    </div>
                            </div>
                        </div>
                        {posts && Object.values(posts).reverse().map((post, i) => (
                            <div className='overAllTweetDiv' key={i}>

                                <>
                                    <div className='borderTopPost' >
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
                                            <div onClick={(e) => handleClick(e, post.id)}>
                                                <p className="pElementHome">{post.tweet}</p>
                                                {post.image ? <img className='tweetImageOnHome' src={post.image} onError={handleError}/>: ''}
                                            </div>
                                            <div className="CommentIconAndNumberSpace">
                                                <CreateCommentSetUp post={post}/>
                                                <div>
                                                    {allComments && allComments.filter(comment => comment.post_id === post.id).length > 0 ? allComments.filter(comment => comment.post_id === post.id).length : ''}
                                                </div>
                                            </div>
                                                {/* <Likes post={post}/> */}
                                        </div>
                                    </div>
                                </>
                            </div>
                        ))}
                    </div>
                {/* </div> */}

            </div>
        </div>
    )
}


export default HomeFeed;
