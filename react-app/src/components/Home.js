import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeedPosts, createJot } from "../store/post";
import NavBar from "./NavBar";

function HomeFeed(){
    const [tweet, setTweet] = useState('');
    const [image, setImage] = useState('');
    const [errors, setErrors] = useState([]);

    const posts = useSelector(state => state.post);
    const currentUser = useSelector(state => state.session.user);



    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFeedPosts())
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        const newPost = {
            tweet,
            image,
            user_id: currentUser.id,
            username: currentUser.username,
            profile_pic: currentUser.profile_pic
        }

        dispatch(createJot(newPost))

    }

    return(
        <>
        <div>
            <NavBar/>
        </div>
        <div>
            <div><h2>Home</h2></div>
            <div>
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
            <div>
                {posts && Object.values(posts).map((post, i) => (
                    <div key={i}>
                        {post.profile_pic}
                        {post.username}
                        {post.tweet}
                        <img src={post.image}/>
                    </div>
                ))}
            </div>

        </div>
        </>
    )
}


export default HomeFeed;
