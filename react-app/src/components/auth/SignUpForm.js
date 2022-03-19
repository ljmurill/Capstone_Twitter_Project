import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { Link } from 'react-router-dom';
import { getAllComments } from '../../store/comment';
import { getFeedPosts } from '../../store/post';


const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [profile_pic, setProfilePic] = useState('');
  const [background_image, setBackgroundImage] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, profile_pic, background_image));
      if (data) {
        setErrors(data)
      }else{
        document.querySelector('body').classList.remove('login')
      }
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

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };


  if (user) {
    return <Redirect to='/homefeed' />;
  }

  return (
    <div>
      <form onSubmit={onSignUp}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label>User Name</label>
          <input
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div>
          <label>Email</label>
          <input
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div>
          <label>Repeat Password</label>
          <input
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <div>
          <label>Profile Pic Url</label>
          <input
          type='text'
          name='profile_pic'
          onChange={(e) => setProfilePic(e.target.value)}
          value={profile_pic}
          >
          </input>
        </div>
        <div>
          <label>Background Image Url</label>
          <input
          type='text'
          name='background_image'
          onChange={(e) => setBackgroundImage(e.target.value)}
          value={background_image}
          >
          </input>
        </div>
        <button type='submit'>Sign Up</button>
      </form>
      <div>
            <p>Have an account already?</p>
            <Link to='/login'>Log In</Link>
      </div>
    </div>
  );
};

export default SignUpForm;
