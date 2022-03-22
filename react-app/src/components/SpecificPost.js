import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import EditModalSetUp from "./EditDeleteModal/EditModalSetUp";
import DeleteModalSetUp from "./EditDeleteModal/DeleteModalSetup";
import { getComments, createComment } from "../store/post";
import NavBar from "./NavBar";
import Ellipsis from "./Home/Ellipsis";
import CreateCommentSetUp from "./EditDeleteModal/createCommentSetUp";


const defaultProfilePic = 'https://www.alphr.com/wp-content/uploads/2020/10/twitter.png';


function SpecificPost(){
    const [comment, setComment] = useState('');
    const [image, setImage] = useState('');
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

        const newComment = {
            comment,
            image,
            user_id: currentUser.id,
            post_id: postId,
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
        }

    }

    return(
        <div className="homeFeedLayout">
            <NavBar />
            <div className="border">
                <h2>Jot</h2>
                <div className='borderTopPost' >
                    <div>
                        <img className='profilePicTopHome' src={post.profile_pic ? post.profile_pic: defaultProfilePic}/>
                    </div>
                    <div className="rightSideOfTweetHome">
                        <div className="tweetUsernameEditDeleteDiv">
                            <p className="pElementHome">{post.username} @{post.username}</p>

                            <Ellipsis post={post}/>

                        </div>
                        <div>
                            <p className="pElementHome">{post.tweet}</p>
                            {post.image ? <img className='tweetImageOnHome' src={post.image}/>: ''}
                        </div>
                    </div>
                </div>
                <div>
                    <CreateCommentSetUp post={post}/>
                </div>
                <div className="formProfilePicPostPage">
                    <div className="imageAndFormPostPage">
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
                                className="inputHomePage"
                                placeholder="What's happening?"
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
                    </div>
                    <button type="submit" className="jotButtonOnHomePage" onClick={handleSubmit}>Reply</button>



                </div>
                <div className="homeFeedHiddenScroll">
                        {comments && comments.map((comment, i) => (
                            // <Link key={i} to={`/posts/${post.id}`}>
                            // <div key={i}>

                            //     <img className='profilePic' src={comment.profile_pic ? comment.profile_pic: defaultProfilePic}/>
                            //     {comment.username}
                            //     {comment.comment}
                            //     <img src={comment.image}/>

                            //     <div>
                            //         <EditModalSetUp post={comment}/>
                            //         <DeleteModalSetUp post={comment}/>
                            //     </div>
                            // </div>
                            <div className='overAllTweetDiv' key={i}>

                            <>
                                <div className='borderTopPost' >
                                    <div>
                                        <img className='profilePicTopHome' src={comment.profile_pic ? comment.profile_pic: defaultProfilePic}/>
                                    </div>
                                    <div className="rightSideOfTweetHome">
                                        <div className="tweetUsernameEditDeleteDiv">
                                            <p className="pElementHome">{comment.username} @{comment.username}</p>

                                            <Ellipsis post={comment}/>

                                        </div>
                                        <div>
                                            <p className="pElementHome">{comment.comment}</p>
                                            {comment.image ? <img className='tweetImageOnHome' src={comment.image}/>: ''}
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
