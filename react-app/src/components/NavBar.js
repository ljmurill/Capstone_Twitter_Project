
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import JotModalSetUp from './JotModal.js/JotModalSetup';

const NavBar = () => {
  const currentUser = useSelector(state => state.session.user)
  return (
    <nav className='navBarMainDiv'>
          <div>
            <NavLink to='/homefeed' exact={true} activeClassName='active'>
              <div className='white'><FontAwesomeIcon icon="fa-solid fa-house" />Home</div>
            </NavLink>

            <NavLink to='/users' exact={true} activeClassName='active'>
            <div className='white'><FontAwesomeIcon icon="fa-regular fa-user" />Users</div>
            </NavLink>

            <NavLink to={`/users/${currentUser.id}`} exact={true} activeClassName='active'>
            <div className='white'><FontAwesomeIcon icon="fa-regular fa-user" />Profile</div>
            </NavLink>

            <JotModalSetUp user={currentUser}/>
          </div>


          <div>
            <LogoutButton />
          </div>

    </nav>
  );
}

export default NavBar;
