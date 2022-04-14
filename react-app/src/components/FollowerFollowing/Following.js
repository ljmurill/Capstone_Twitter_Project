import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import SearchBar from "../SearchBar";
import NavBar from "../NavBar";
import ButtonFollow from "./buttons";
import { currentUserFollow } from "../../store/follows";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
const defaultProfilePic = 'https://www.alphr.com/wp-content/uploads/2020/10/twitter.png';
function Following(){
    const [user, setUser] = useState({});
    const [following, setFollowing] =useState([])
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
            const response = await fetch(`/follows/${userId}/following`)
            const followers = await response.json()
            let data = followers.following.filter(item => item.id !== currentUser.id);
            data.unshift(currentUser)
            setFollowing(data);
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
                <Link className="splitFollowSection" to={`/users/${user.id}/followers`}><p className="notCurrentFollow">Followers</p></Link>
                <Link className="splitFollowSection" to={`/users/${user.id}/following`}><p className="currentFollow">Following</p></Link>
            </div>
            <div className="homeFeedHiddenScroll">
                {following && following.map((user, i) => (
                    <div key={i} className="parentFollowerDiv">
                        <Link className='linkSearchBar' to={`/users/${user.id}`}>
                            <div className="followerDiv">
                                <img className='followersImage' src={user.profile_pic ? user.profile_pic : defaultProfilePic} alt=''/>
                                    <div className="usernamesTogether">
                                    <p className="usernameSearchBar">{user.username}</p>
                                    <div className="atAndFollowsYou">
                                        <p className="atUsernameFollows">@{user.username}</p>
                                        {currentUserFollowers.map((cuserFollower, i) => {
                                            if(user.id === cuserFollower.id) return <label className="labelFollowsYou" key={i}>Follows you</label>
                                        })}
                                        {/* {user.id === currentUser.id && <label className="labelFollowsYou">You</label>} */}
                                    </div>

                                    </div>
                            </div>
                        </Link>
                                <ButtonFollow user={user} follow={follow}/>
                        </div>

                ))}
            </div>
            </div>
            <SearchBar/>
        </div>
    )
}

export default Following;
