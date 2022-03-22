import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { profilePostsComments } from '../store/post';
import { getAllComments } from '../store/comment';
import DeleteModalSetUp from './EditDeleteModal/DeleteModalSetup';
import EditModalSetUp from './EditDeleteModal/EditModalSetUp';
import Ellipsis from './Home/Ellipsis';
import CreateCommentSetUp from './EditDeleteModal/createCommentSetUp';
import NavBar from './NavBar';
import './splashHomeNav.css';
const defaultBackground = 'https://camo.mybb.com/f47a68f9fd1d3f39f1aa9790fe74520f256d2142/687474703a2f2f692e696d6775722e636f6d2f64485850582e706e67'
const defaultProfilePic = 'https://www.alphr.com/wp-content/uploads/2020/10/twitter.png';

function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const total = useSelector(state => state.post)
  const allComments = useSelector(state => state.comment.allComments);



  useEffect(() => {
    dispatch(profilePostsComments(userId))
    dispatch(getAllComments())
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  const handleClick = (e, postId) => {
    e.preventDefault()
    history.push(`/posts/${postId}`)

}

  return (
      <div className="homeFeedLayout">
        <NavBar />
        <div className="border">
          <div>
            <h1 className='userNameProfilePage'>{user.username}</h1>
          <div>{Object.values(total).length > 0 ? Object.values(total).length: ''} Jots</div>
          </div>

            <div className='parent'>
              <img className='backgroundImageProfile' src={user.background_image ? user.background_image : defaultBackground}/>
              <img className='profilePicMain' src={user.profile_pic ? user.profile_pic : defaultProfilePic}/>
            </div>
            <div className='userInformation'>
              <div>{user.username}</div>
              <div>@{user.username}</div>
              <FontAwesomeIcon icon="fa-solid fa-calendar-days" /><span>Joined {user.created_at}</span>
            </div>

          <div className="homeFeedHiddenScroll">
            {total && Object.values(total).map((post, i) => (
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
  );
}
export default User;
