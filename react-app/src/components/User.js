import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { profilePostsComments } from '../store/post';
import { getAllComments } from '../store/comment';
import Ellipsis from './Home/Ellipsis';
import CreateCommentSetUp from './EditDeleteModal/createCommentSetUp';
import NavBar from './NavBar';
import './splashHomeNav.css';
import EditProfileSetUp from './EditProfile/EditProfileSetUp';
import Likes from './Likes';
import moment from 'moment';
import SearchBar from './SearchBar';
import { currentUserFollow, followUser, getAllFollowers, getAllFollowing, unfollowUser } from '../store/follows';
const defaultBackground = 'https://camo.mybb.com/f47a68f9fd1d3f39f1aa9790fe74520f256d2142/687474703a2f2f692e696d6775722e636f6d2f64485850582e706e67'
const defaultProfilePic = 'https://www.alphr.com/wp-content/uploads/2020/10/twitter.png';

function User() {
  const [user, setUser] = useState({});
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const { userId }  = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(state => state.session.user)
  const follow = useSelector(state => state.follow)
  let total = useSelector(state => state.post)
  const allComments = useSelector(state => state.comment.allComments);

  total = Object.values(total).reverse().filter(post => post.user_id === +userId)

  useEffect(() => {
    dispatch(profilePostsComments(userId))
    dispatch(getAllComments())
    dispatch(currentUserFollow(currentUser.id))
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);

    })();

    (async () => {
      const response = await fetch(`/follows/${userId}/following`)
      const following = await response.json()
      setFollowing(following.following.length);
    })();

    (async () => {
      const response = await fetch(`/follows/${userId}/followers`)
      const followers = await response.json()
      setFollowers(followers.followers.length);
    })();
  }, [dispatch, userId]);

  if (!user) {
    return null;
  }


  const handleClick = (e, postId) => {
    e.preventDefault()
    history.push(`/posts/${postId}`)
  }

  const handleFollow = async() => {
    await dispatch(followUser(userId));
    setFollowers(() => followers + 1)


  }

  const handleUnFollow = async() => {
    await dispatch(unfollowUser(userId));
    setFollowers(() => followers - 1)

  }
  const handleError =(e) => {
    e.target.src = 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found-300x169.jpg'
  }

  const handleMouseEnter = () => {
    document.querySelector(`.followingOnUserPageButton`).innerHTML = 'Unfollow'
  }

  const handleMouseExit = () => {
      document.querySelector(`.followingOnUserPageButton`).innerHTML = 'Following'
  }

  return (
      <div className="homeFeedLayout">
        <NavBar />
        <div className="border">
          <div className='arrowAndHeader'>
          <div className='arrowHoverAffect'><FontAwesomeIcon icon="fa-solid fa-arrow-left" onClick={() => history.goBack()}/></div>
          <div>
            <h2 className='userNameProfilePage'>{user.username}</h2>
            <div className='numberOfJotsProfilePage'>{total.length > 0 ? total.length: 0} Jot(s)</div>
          </div>
          </div>
          {/* <div>{Object.values(total).length > 0 ? Object.values(total).length: ''} Jots</div> */}


          <div className="homeFeedHiddenScroll">
            <div className='parent'>
              <img className='backgroundImageProfile' src={user.background_image ? user.background_image : defaultBackground} onError={handleError}/>
              <div className='FollowButtonOnProfilePage'>
                {currentUser.id === +userId && <EditProfileSetUp user={user} setUser={setUser}/>}
                {follow.current[userId] && (+userId !== currentUser.id) && <button className='followingOnUserPageButton'
                        onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseExit} onClick={handleUnFollow}>Following</button>}
                {!follow.current[userId]  && (+userId !== currentUser.id) && <button className='StyleFollowButtonOnProfilePage' onClick={handleFollow}>Follow</button>}
              </div>
              {currentUser.id === +userId ?
                <img className='profilePicMain' src={user.profile_pic ? user.profile_pic : defaultProfilePic} onError={handleError}/>
                :<img className='profilePicMain' src={user.profile_pic ? user.profile_pic : defaultProfilePic} onError={handleError}/>
              }
            </div>
            <div className='userInformation'>
                <div>
                  <h2 className='usernameOnProfilePageMiddleSection'>{user.username}</h2>
                  <div className='pElementAtUserName'>@{user.username}</div>
                </div>
                <div className='UserCreatedOnProfilePage'>
                <FontAwesomeIcon icon="fa-solid fa-calendar-days" /><span>Joined {user.created_at}</span>
                </div>
                <div className='followersFollowingTrack'>
                  <div>
                    <Link to={`/users/${userId}/following`} className='linkSearchBar hover'>
                        <span className='BoldNumber'>{following}</span> <span className='pElementAtUserName'>Following</span>
                    </Link>
                  </div>
                  <div>
                    <Link to={`/users/${userId}/followers`} className='linkSearchBar hover'>
                    <span className='BoldNumber'>{followers}</span> <span className='pElementAtUserName'>Followers</span>
                    </Link>
                  </div>
                </div>



            </div>

            {/* {total && Object.values(total).map((post, i) => ( */}
            {total && total.map((post, i) => (

              <div className='overAllTweetDiv' key={i}>

                  <div className='borderTopPost' >
                      <div>
                        <Link to={`/users/${post.user_id}`}>
                          <img className='profilePicTopHome' src={post.profile_pic ? post.profile_pic: defaultProfilePic} onError={handleError}/>
                        </Link>
                      </div>
                      <div className="rightSideOfTweetHome">
                          <div className="tweetUsernameEditDeleteDiv">
                            <div className="usernameAtUsernameDiv">
                                <p className="pElementHomePostUsername">{post.username}</p>
                                <span className="pElementAtUserName">@{post.username} - {moment(post.created_at).fromNow()}</span>
                            </div>

                              {post.user_id === currentUser.id && <Ellipsis post={post}/>}

                          </div>
                          <div onClick={(e) => handleClick(e, post.id)}>
                              <p className="pElementHome">{post.tweet}</p>
                              {post.image ? <img className='tweetImageOnHome' src={post.image} onError={handleError}/>: ''}
                          </div>
                          <div className="CommentIconAndNumberSpace">
                              <div className="postIcons">
                                  <CreateCommentSetUp post={post}/>
                                  {allComments && allComments.filter(comment => comment.post_id === post.id).length > 0 ? allComments.filter(comment => comment.post_id === post.id).length : ''}
                              </div>
                              <Likes post={post}/>
                          </div>
                      </div>
                  </div>

              </div>
            ))}
          </div>
        </div>
        <SearchBar/>
      </div>
  );
}
export default User;
