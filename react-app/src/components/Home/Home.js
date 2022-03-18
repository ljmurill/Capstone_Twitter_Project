import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { createJot } from "../../store/post";
import { useHistory } from "react-router-dom";
import NavBar from "../NavBar";
import EditModalSetUp from "../EditDeleteModal/EditModalSetUp";
import DeleteModalSetUp from "../EditDeleteModal/DeleteModalSetup";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { getAllComments } from "../../store/comment";

const defaultProfilePic = 'https://www.alphr.com/wp-content/uploads/2020/10/twitter.png';

function HomeFeed(){
    const [tweet, setTweet] = useState('');
    const [image, setImage] = useState('');
    const [errors, setErrors] = useState([]);

    const posts = useSelector(state => state.post);
    const currentUser = useSelector(state => state.session.user);
    const allComments = useSelector(state => state.comment);

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllComments())
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
                <div>
                    <div>
                        <h2>Home</h2>
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
                                onChange={(e)=> setTweet(e.target.value)}
                                value={tweet}
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
                            <button type="submit">Jot</button>
                        </form>
                    </div>
                </div>
                <div className="homeFeedHiddenScroll">
                    {posts && Object.values(posts).map((post, i) => (

                        <div key={i}>
                            <div className='borderTopPost' onClick={(e) => handleClick(e, post.id)}>
                                <img className='profilePic' src={post.profile_pic ? post.profile_pic: defaultProfilePic}/>
                                {post.username}
                                {post.tweet}
                                <img src={post.image}/>

                            </div>
                            <div>
                                <FontAwesomeIcon icon="fa-regular fa-comment" />
                                {allComments.filter(comment => comment.post_id === post.id).length}
                                <EditModalSetUp post={post}/>
                                <DeleteModalSetUp post={post}/>
                            </div>
                        </div>

                    ))}
                </div>

            </div>
        </div>
    )
}


export default HomeFeed;
