import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeedPosts, createJot, getComments } from "../store/post";
import { Link, useHistory } from "react-router-dom";
import NavBar from "./NavBar";
import EditModalSetUp from "./EditDeleteModal/EditModalSetUp";
import DeleteModalSetUp from "./EditDeleteModal/DeleteModalSetup";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const defaultProfilePic = 'https://www.alphr.com/wp-content/uploads/2020/10/twitter.png';

function HomeFeed(){
    const [tweet, setTweet] = useState('');
    const [image, setImage] = useState('');
    const [errors, setErrors] = useState([]);

    const posts = useSelector(state => state.post);
    const currentUser = useSelector(state => state.session.user);

    useEffect(() => {

        async function test(){
            if(posts){
                Object.values(posts).forEach(post => {
                   await dispatch(getComments(post.id))
                })
            }
        };
        test()
    }, [])

    const history = useHistory();
    const dispatch = useDispatch();

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
                        // <Link key={i} to={`/posts/${post.id}`}>
                        <div key={i}>
                            <div className='borderTopPost' onClick={(e) => handleClick(e, post.id)}>
                                <img className='profilePic' src={post.profile_pic ? post.profile_pic: defaultProfilePic}/>
                                {post.username}
                                {post.tweet}
                                <img src={post.image}/>

                            </div>
                            <div>
                                <FontAwesomeIcon icon="fa-regular fa-comment" />
                                {}
                                <EditModalSetUp post={post}/>
                                <DeleteModalSetUp post={post}/>
                            </div>
                        </div>
                        // </Link>
                    ))}
                </div>

            </div>
        </div>
    )
}


export default HomeFeed;
