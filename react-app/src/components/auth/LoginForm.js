import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './auth.css'
import { getAllComments } from '../../store/comment';
import { getFeedPosts } from '../../store/post';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();


    document.querySelector('body').classList.add('login');



      // document.querySelector('body').classList.remove('login');


  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }else{

      document.querySelector('body').classList.remove('login')
    }
  };

  const handleDemo = async(e) => {
    e.preventDefault();
    await dispatch(login('demo@aa.io', 'password'))
    document.querySelector('body').classList.remove('login')
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/homefeed' />;
  }

  return (
    <div>
      <div className='signUpDiv'>
        <Link to='/' className='xmarkOnLoginForm' onClick={() => document.querySelector('body').classList.remove('login')}><FontAwesomeIcon icon="fa-solid fa-xmark" size='2x' className='xmarkOnLoginForm' /></Link>
        <div className='actualLoginForm'>
          <h2 className='headerForLoginPage'>Sign in to Jotter</h2>
          <form onSubmit={onLogin} className='loginInputsButtonsErrors'>
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div>

              <input
                className='loginFormInput'
                name='email'
                type='text'
                placeholder='Email'
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div>

              <input
                className='loginFormInput'
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={updatePassword}
              />
            </div>
            <div className='ButtonsOnLoginFormDiv'>
              <button type='submit' className='LoginPageButton'>Login</button>
              <button type='submit' className='LoginPageButton' onClick={handleDemo}>Demo User</button>
            </div>
          </form>
          <div className='lowerSectionLoginForm'>
            <p>Don't have an account?</p>
            <Link className='loginLinkBottom' to='/sign-up'>Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
