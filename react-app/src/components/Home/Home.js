import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { createJot, getFeedPosts } from "../../store/post";
import { useHistory } from "react-router-dom";
import NavBar from "../NavBar";
import Ellipsis from "./Ellipsis";
import './home.css'
import { getAllComments } from "../../store/comment";
import CreateCommentSetUp from "../EditDeleteModal/createCommentSetUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditModalSetUp from "../EditDeleteModal/EditModalSetUp";
import DeleteModalSetUp from "../EditDeleteModal/DeleteModalSetup";

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
        dispatch(getAllComments())
        dispatch(getFeedPosts())
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
        }

    }

    const handleClick = (e, postId) => {
        e.preventDefault()
        history.push(`/posts/${postId}`)

    }


    return(
        <div className="homeFeedLayout">

            <NavBar/>

            <div className="border">
                <div className="topOfHomePage">
                    <div>
                        <h2>Home</h2>
                    </div>
                    <div className="formProfilePicHomePage">
                        <img className='profilePicTopHome' src={currentUser.profile_pic ? currentUser.profile_pic: defaultProfilePic}/>
                        <div className="formAndButtonDiv">
                        <form>
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
                                placeholder="Image (optional)"
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
                </div>
                <div className="homeFeedHiddenScroll">
                    {posts && Object.values(posts).map((post, i) => (
                        <div className='overAllTweetDiv' key={i}>

                            <>
                                <div className='borderTopPost' >
                                    <div>
                                        <img className='profilePicTopHome' src={post.profile_pic ? post.profile_pic: defaultProfilePic}/>
                                    </div>
                                    <div className="rightSideOfTweetHome">
                                        <div className="tweetUsernameEditDeleteDiv">
                                            <p className="pElementHome">{post.username} @{post.username}</p>

                                            <Ellipsis post={post}/>

                                        </div>
                                        <div onClick={(e) => handleClick(e, post.id)}>
                                            <p className="pElementHome">{post.tweet}</p>
                                            {post.image ? <img className='tweetImageOnHome' src={post.image}/>: ''}
                                        </div>
                                        <div>
                                            <CreateCommentSetUp post={post}/>
                                            {allComments && allComments.filter(comment => comment.post_id === post.id).length > 0 ? allComments.filter(comment => comment.post_id === post.id).length : ''}
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


export default HomeFeed;
