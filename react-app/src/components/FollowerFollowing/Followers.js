import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from 'react-router-dom';
import SearchBar from "../SearchBar";
import NavBar from "../NavBar";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './following.css'
import { useDispatch, useSelector } from "react-redux";
import { currentUserFollow2, followUser, unfollowUser, currentUserFollow } from "../../store/follows";

const defaultProfilePic = 'https://www.alphr.com/wp-content/uploads/2020/10/twitter.png';
function Followers(){
    const [user, setUser] = useState({});
    const [followers, setFollowers] = useState([]);
    const [currentUserFollowers, setCurrentUserFollowers] = useState([])
    const currentUser = useSelector(state => state.session.user)
    const follow = useSelector(state => state.follow)
    const history = useHistory()
    const dispatch = useDispatch()
    const {userId} = useParams()


    useEffect(() => {
        dispatch(currentUserFollow(currentUser.id))

        if (!userId) {
            return;
          }
        (async () => {
        const response = await fetch(`/api/users/${userId}`);
        const user = await response.json();
        setUser(user);

        })();
        (async () => {
            const response = await fetch(`/follows/${userId}/followers`)
            const followers = await response.json()
            console.log(followers.followers)
            setFollowers(followers.followers);
        })();
        (async () => {
            const response = await fetch(`/follows/${currentUser.id}/followers`)
            const followers = await response.json()
            setCurrentUserFollowers(followers.followers);
        })();
    },[dispatch, userId])

    if (!user) {
        return null;
    }

    const handleFollow = async() => {
        await dispatch(followUser(userId));
    }

    const handleUnFollow = async() => {
        await dispatch(unfollowUser(userId));
    }


    return(
        <div className="homeFeedLayout">
            <NavBar />
            <div className="border">
            <div className='arrowAndHeader'>
            <div className='arrowHoverAffect'><FontAwesomeIcon icon="fa-solid fa-arrow-left" onClick={() => history.goBack()}/></div>
            <div>
                <h2 className='userNameProfilePage'>{user.username}</h2>
                <div className='numberOfJotsProfilePage'>@{user.username}</div>
            </div>
            </div>
            <div className="followingSection">
                <div className="splitFollowSection"><p className="currentFollow">Followers</p></div>
                <div className="splitFollowSection"><p className="notCurrentFollow">Following</p></div>
            </div>
            <div className="homeFeedHiddenScroll">
                {followers && followers.map((user, i) => (
                    <Link className='linkSearchBar' key={i} to={`/users/${user.id}`}>
                        <div className="followerDiv">
                            <img className='followersImage' src={user.profile_pic ? user.profile_pic : defaultProfilePic} alt=''/>
                                <div className="usernamesTogether">
                                <p className="usernameSearchBar">{user.username}</p>
                                <div>
                                    <p className="atUsernameFollows">@{user.username}</p>
                                    {currentUserFollowers.map((cuserFollower, i) => {
                                        if(user.id === cuserFollower.id) return <label key={i}>Follows you</label>
                                    })}
                                </div>
                                {follow.current[user.id] && <button className='StyleFollowButtonOnProfilePage' onClick={handleUnFollow}>Unfollow</button>}
                                {!follow.current[user.id] && <button className='StyleFollowButtonOnProfilePage' onClick={handleFollow}>Follow</button>}

                                </div>
                        </div>

                    </Link>
                ))}
            </div>
            </div>
            <SearchBar/>
        </div>
    )
}

export default Followers;
