import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { profilePostsComments } from '../store/post';
import DeleteModalSetUp from './EditDeleteModal/DeleteModalSetup';
import EditModalSetUp from './EditDeleteModal/EditModalSetUp';

const defaultBackground = 'https://camo.mybb.com/f47a68f9fd1d3f39f1aa9790fe74520f256d2142/687474703a2f2f692e696d6775722e636f6d2f64485850582e706e67'
const defaultProfilePic = 'https://www.alphr.com/wp-content/uploads/2020/10/twitter.png';

function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const dispatch = useDispatch();

  const total = useSelector(state => state.post)




  useEffect(() => {
    dispatch(profilePostsComments(userId))
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


  return (
      <>
        <div>

          <h1>{user.username}</h1>
        <div>{Object.values(total).length > 0 ? Object.values(total).length: ''}number of jots</div>
        </div>
        <div>
          <img src={user.background_image ? user.background_image : defaultBackground}/>
          <img className='profilePic' src={user.profile_pic ? user.profile_pic : defaultProfilePic}/>
          <div>{user.username}</div>
          <div>@{user.username}</div>
          <FontAwesomeIcon icon="fa-solid fa-calendar-days" /><span>Joined {user.created_at}</span>
        </div>
        <div>
          {total && Object.values(total).map((post, i) => (
            <div key={i}>
              <div>
                <img className='profilePic' src={post.profile_pic ? post.profile_pic: defaultProfilePic}/>
                {post.username}
                <span>@{post.username}</span>
              </div>
              {post.tweet ? post.tweet: post.comment}
              <EditModalSetUp post={post}/>
              <DeleteModalSetUp post={post}/>
            </div>
          ))}
        </div>
      </>
  );
}
export default User;
