import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Splash from './components/Splash';
import HomeFeed from './components/Home/Home';
import SpecificPost from './components/SpecificPost';
import { getFeedPosts, totalPosts } from './store/post';
import {getAllComments} from './store/comment';
import Followers from './components/FollowerFollowing/Followers';
import Following from './components/FollowerFollowing/Following';
import NotFound from './components/NotFound';



function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      await dispatch(totalPosts())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact={true}>
          <Splash/>
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm/>
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId/followers' exact={true}>
          <Followers/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId/following' exact={true}>
          <Following/>
        </ProtectedRoute>
        <ProtectedRoute path='/posts/:postId' exact={true} >
          <SpecificPost />
        </ProtectedRoute>
        <ProtectedRoute path='/homefeed' exact={true} >
          <HomeFeed/>
        </ProtectedRoute>
        <ProtectedRoute>
          <NotFound/>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
