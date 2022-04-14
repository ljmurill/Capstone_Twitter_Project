
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutModalSetUp from '../components/auth/LogoutModalSetup';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import JotModalSetUp from './JotModal.js/JotModalSetup';

const NavBar = () => {
  const currentUser = useSelector(state => state.session.user)
  return (
    <nav className='navBarMainDiv'>
          <div className='topNavSection'>
            {/* <NavLink to='/homefeed' exact={true} className='linkTextDecoration'>
              <div className='HomeIconHoverAffect'><FontAwesomeIcon icon="fa-solid fa-file-pen" color='white' className='navBarIcon'/></div>
            </NavLink> */}
            <NavLink to='/homefeed' exact={true} activeClassName='active' className='linkTextDecoration'>
              <div className='white'><FontAwesomeIcon icon="fa-solid fa-house" />Home</div>
            </NavLink>

            <NavLink to='/users' exact={true} activeClassName='active' className='linkTextDecoration'>
            <div className='white'><FontAwesomeIcon icon="fa-regular fa-user" />Users</div>
            </NavLink>

            <NavLink to={`/users/${currentUser.id}`} exact={true} activeClassName='active' className='linkTextDecoration'>
            <div className='white'><FontAwesomeIcon icon="fa-regular fa-user" />Profile</div>
            </NavLink>

            <JotModalSetUp user={currentUser}/>
          </div>


          <div>
            <LogoutModalSetUp />
          </div>

    </nav>
  );
}

export default NavBar;
