import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAllComments } from '../../store/comment';
import { getFeedPosts } from '../../store/post';


const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [profile_pic, setProfilePic] = useState('');
  const [background_image, setBackgroundImage] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  document.querySelector('body').classList.add('login');

  const onSignUp = async (e) => {
    e.preventDefault();
    const data = await dispatch(signUp(username, email, password, confirm_password ,profile_pic, background_image));

      if (data) {
        setErrors([...data])
     }else{
      document.querySelector('body').classList.remove('login')
    }
  };



  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };


  if (user) {
    return <Redirect to='/homefeed' />;
  }

  return (
    <div>
      <div className='signUpDiv'>
      <Link to='/' className='xmarkOnLoginForm' onClick={() => document.querySelector('body').classList.remove('login')}><FontAwesomeIcon icon="fa-solid fa-xmark" size='2x' className='xmarkOnLoginForm' /></Link>
      <div className='actualLoginForm'>
      <h2 className='headerForLoginPage'>Join Jotter Today</h2>
      <form onSubmit={onSignUp} className='loginInputsButtonsErrors'>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>

          <input
            className='loginFormInput'
            placeholder='User Name'
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div>
          <input
            className='loginFormInput'
            placeholder='Email'
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div>

          <input
            className='loginFormInput'
            placeholder='Password'
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div>

          <input
            className='loginFormInput'
            placeholder='Confirm Password'
            type='password'
            name='repeat_password'
            onChange={updateConfirmPassword}
            value={confirm_password}

          ></input>
        </div>
        <div>

          <input
          className='loginFormInput'
          placeholder='Profile Picture Url (Optional)'
          type='text'
          name='profile_pic'
          onChange={(e) => setProfilePic(e.target.value)}
          value={profile_pic}
          >
          </input>
        </div>

        <div>

          <input
          className='loginFormInput'
          placeholder='Background Picture Url (Optional)'
          type='text'
          name='background_image'
          onChange={(e) => setBackgroundImage(e.target.value)}
          value={background_image}
          >
          </input>

        </div>
        <div className='ButtonsOnLoginFormDiv'>
        <button className='LoginPageButton' type='submit'>Sign Up</button>
        </div>
      </form>
      <div className='lowerSectionLoginForm'>
            <p>Have an account already?</p>
            <Link className='loginLinkBottom' to='/login'>Log In</Link>
      </div>
      </div>
      </div>
    </div>
  );
};

export default SignUpForm;
