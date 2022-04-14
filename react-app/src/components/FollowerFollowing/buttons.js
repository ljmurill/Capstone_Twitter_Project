import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUserFollow2, followUser, unfollowUser, currentUserFollow } from "../../store/follows";

function ButtonFollow({user, follow, setFollowing}){
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.session.user)

    const handleFollow = async(id) => {
        await dispatch(followUser(id));
        await dispatch(currentUserFollow(currentUser.id))
    }

    const handleUnFollow = async(id) => {
        await dispatch(unfollowUser(id));
        await dispatch(currentUserFollow(currentUser.id))

    }

    return (
        <>
        {follow.current[user.id] && (user.id !== currentUser.id) && <button className='StyleFollowButtonOnProfilePage' onClick={()=> handleUnFollow(user.id)}>Unfollow</button>}
        {!follow.current[user.id] && (user.id !== currentUser.id) && <button className='StyleFollowButtonOnProfilePage' onClick={() => handleFollow(user.id)}>Follow</button>}
        </>
    )
}

export default ButtonFollow;
