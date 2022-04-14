import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import NavBar from './NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const defaultProfilePic = 'https://www.alphr.com/wp-content/uploads/2020/10/twitter.png';
function UsersList() {
  const [users, setUsers] = useState([]);

  const history = useHistory();

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
      <div key={i}>
        {currentUser.id !== user.id &&  <NavLink className='userListNavLinks' to={`/users/${user.id}`}>
          <div className='userListSection'>
            <img className='profilePicTopHome' src={user.profile_pic ? user.profile_pic: defaultProfilePic} onError={handleError}/>
            <span>{user.username}</span>
          </div>
          </NavLink>}
      </div>

    );
  });

  return (

    <div className='userListPageLayout'>
      <NavBar/>
      <div className='border'>

      <div className='userListTitleAndUserList'>
        <div className='arrowAndHeader addedMargin'>
          <div className='arrowHoverAffect'><FontAwesomeIcon icon="fa-solid fa-arrow-left" onClick={() => history.goBack()}/></div>
          <div className="HomeTitleHomePage"><h2 className='userNameProfilePage'>User List</h2></div>
        </div>
        <div className='hiddenScrollOnUserList'>
          <div className='flexWrapOfUsers'>{userComponents}</div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default UsersList;
