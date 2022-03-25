import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import NavBar from './NavBar';
const defaultProfilePic = 'https://www.alphr.com/wp-content/uploads/2020/10/twitter.png';
function UsersList() {
  const [users, setUsers] = useState([]);

  const currentUser = useSelector(state => state.session.user);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const handleError =(e) => {
    e.target.src = 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found-300x169.jpg'
  }

  const userComponents = users.map((user, i) => {
    return (
      <>
        {currentUser.id !== user.id &&  <NavLink className='userListNavLinks' to={`/users/${user.id}`}>
          <div key={user.id} className='userListSection'>
            <img className='profilePicTopHome' src={user.profile_pic ? user.profile_pic: defaultProfilePic} onError={handleError}/>
            <span>{user.username}</span>
          </div>
          </NavLink>}
      </>

    );
  });

  return (

    <div className='userListPageLayout'>
      <NavBar/>
      <div className='userListTitleAndUserList'>
        <h1>User List </h1>
        <div className='hiddenScrollOnUserList'>
          <div className='flexWrapOfUsers'>{userComponents}</div>
        </div>
      </div>
    </div>
  );
}

export default UsersList;
