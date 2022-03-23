const LIKE_POST = 'like/LIKE_POST'
const DISLIKE_POST = 'like/DISLIKE_POST'
const LIKE_COMMENT = 'like/LIKE_COMMENT'
const DISLIKE_COMMENT = 'like/DISLIKE_COMMENT'



const likePost = (like) => ({
    type: LIKE_POST,
    like
})

const likeComment = (like) => ({
    type: LIKE_COMMENT,
    like
})

const dislikePost = (like) => ({
    type: DISLIKE_POST,
    like
})

const dislikeComment = (like) => ({
    type: DISLIKE_COMMENT,
    like
})

export const postLike = (postId) => async(dispatch) => {
    const response = await fetch(`/likes/${postId}/post`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
    })
    if (response.ok){
        const like = await response.json();
        dispatch(likePost(like))
    }
}
export const commentLike = (commentId) => async(dispatch) => {
    const response = await fetch(`/likes/${commentId}/comment`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
    })
    if (response.ok){
        const like = await response.json();
        dispatch(likeComment(like))
    }
}

export const postDislike = (postId) => async(dispatch) => {
    const response = await fetch(`likes/${postId}/post`,{
        method: 'DELETE',
        headers: {'Content-Type':'application/json'},
    })
    if (response.ok){
        const like = await response.json();
        dispatch(dislikePost(like))
    }
}

export const commentDislike = (commentId) => async(dispatch) => {
    const response = await fetch(`likes/${commentId}/comment`,{
        method: 'DELETE',
        headers: {'Content-Type':'application/json'},
    })
    if (response.ok){
        const like = await response.json();
        dispatch(dislikeComment(like))
    }
}


const initialState = { comment:{}, post:{}}
export default function likeReducer(state=initialState, action){
    let newState;
    switch(action.type){
        case LIKE_POST:
            newState={...state};
            newState.post[action.like.id] = {...action.like}
            return newState;
        case DISLIKE_POST:
            newState={...state};
            delete newState.post[action.like.id]
            return newState;
        case LIKE_COMMENT:
            newState={...state};
            newState.comment[action.like.id] = {...action.like}
            return newState;
        case DISLIKE_COMMENT:
            newState={...state};
            delete newState.comment[action.like.id]
            return newState;
        default:
            return state;

    }
}
