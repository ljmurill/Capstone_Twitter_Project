const FOLLOW = 'follows/FOLLOW';
const UNFOLLOW = 'follows/UNFOLLOW';
// const GET_FOLLOWING = 'follows/GET_FOLLOWING';
// const GET_FOLLOWERS = 'follows/GET_FOLLOWERS';
const CURRENT_USER_FOLLOWING = 'follows/CURRENT_USER_FOLLOWING';

const currentUserFollowing = (current) => ({
    type:CURRENT_USER_FOLLOWING,
    current,
})

// const followers = (allFollowers) => ({
//     type:GET_FOLLOWERS,
//     followers:allFollowers,
// })

// const following = (allFollowing) => ({
//     type:GET_FOLLOWING,
//     following:allFollowing,
// })

const follow = (followedUser) => ({
    type:FOLLOW,
    user:followedUser
})

const unfollow = (user) => ({
    type: UNFOLLOW,
    user
})

export const currentUserFollow = (userId) => async(dispatch) => {
    const response = await fetch(`/follows/${userId}/following`)
    if (response.ok){
        const data = await response.json();
        dispatch(currentUserFollowing(data))
    }
}

// export const getAllFollowers =(userId) => async(dispatch) => {
//     const response = await fetch(`/follows/${userId}/followers`);
//     if(response.ok){
//         const all = await response.json();
//         dispatch(followers(all))
//     }
// }

// export const getAllFollowing =(userId) => async(dispatch) => {
//     const response = await fetch(`/follows/${userId}/following`)
//     if(response.ok){
//         const all = await response.json();
//         dispatch(following(all))
//     }
// }

export const followUser = (userId) => async(dispatch) => {
    const response = await fetch(`/follows/${userId}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    })
    if (response.ok){
        const user = await response.json();
        dispatch(follow(user))
    }
}

export const unfollowUser = (userId) => async(dispatch) => {
    const response = await fetch(`/follows/${userId}/unfollow`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    })
    if (response.ok){
        const user = await response.json();
        dispatch(unfollow(user))
    }
}


// const initialState = {following:{}, followers:{}, current:{}};
const initialState = {current:{}};

export default function followReducer(state=initialState, action){
    let newState;
    switch(action.type){
        // case GET_FOLLOWING:
        //     newState={...state};
        //     action.following.following.forEach(user => newState.following[user.id] = user);
        //     return newState;
        // case GET_FOLLOWERS:
        //     newState={...state};
        //     action.followers.followers.forEach(user => newState.followers[user.id] = user);
        //     return newState;
        case CURRENT_USER_FOLLOWING:
            newState={...state};
            console.log(action.current, 'dsfsdfsdddsfdsfsdfsdf')
            action.current.following.forEach(user => newState.current[user.id] = user);
            return newState;
        case FOLLOW:
            newState={...state}
            newState.current[action.user.id] = {...action.user}

            return newState;
        case UNFOLLOW:
            newState={...state}

            delete newState.current[action.user.id];
            return newState;
        default:
            return state;
    }
}
