import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = ({setShowModal}) => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return (
    <>
    <h2>Log out of Jotter?</h2>
      <button onClick={onLogout}>Log out</button>
      <button onClick={() => setShowModal(false)}>Cancel</button>
    </>
  )
};

export default LogoutButton;
