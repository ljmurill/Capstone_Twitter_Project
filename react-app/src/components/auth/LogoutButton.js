import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = ({setShowModal}) => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return (
    <div className='logoutModalExact'>
    <h2>Log out of Jotter?</h2>
    <div className='centerDivForLogOutModal'>
      <span className='pElementAtUserNameFix'>You can always log back in at any time. Come back soon!</span>
      <div>
        <button className='logoutButtonModal' onClick={onLogout}>Log out</button>
      </div>
      <div>
        <button className='logoutModalCancel' onClick={() => setShowModal(false)}>Cancel</button>
      </div>
      </div>
    </div>
  )
};

export default LogoutButton;
