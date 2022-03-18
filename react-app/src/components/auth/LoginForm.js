import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { Link } from 'react-router-dom';
import './auth.css'

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
    <div className='loginFormDiv'>
      <Link to='/' onClick={() => document.querySelector('body').classList.remove('login')}><button>Exit</button></Link>
      <div className='actualLoginForm'>
        <h2>Sign in to Jotter</h2>
        <form onSubmit={onLogin} >
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div>
            <label htmlFor='email'>Email</label>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
            <button type='submit'>Login</button>
            <button type='submit' onClick={handleDemo}>Demo User</button>
          </div>
        </form>
        <div>
          <p>Don't have an account?</p>
          <Link to='/sign-up'>Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
