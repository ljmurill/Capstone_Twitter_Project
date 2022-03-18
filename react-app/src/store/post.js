// *********************** POST ***************************


const FEED_POSTS = 'post/FEED_POSTS';
const CREATE_POSTS = 'post/CREATE_POSTS';
const EDIT_POST = 'post/EDIT_POST';
const DELETE_POST = 'post/DELETE_POST';


const feedPosts = (feed) => ({
    type: FEED_POSTS,
    posts: feed
})


const createPost = (post) => ({
    type: CREATE_POSTS,
    post
})

const editPost = (post) => ({
    type: EDIT_POST,
    post
})

const erasePost = (post) => ({
    type: DELETE_POST,
    post
})

export const getFeedPosts = () => async(dispatch) => {
    const response = await fetch('/posts')

    if(response.ok){
        const posts = await response.json()
        dispatch(feedPosts(posts))
    }
    return response;
}

export const createJot = (newPost) => async(dispatch) => {
    const response = await fetch('/posts', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newPost)
    })

    if (response.ok){
        const post = await response.json();
        dispatch(createPost(post))
        return null;
    } else if(response.status < 500){
        const data = await response.json();
        if (data.errors) {
            console.log(data.errors)
          return data.errors;
        }
    } else{
        return ['Something went wrong. Please try again.']
    }
}

export const updatePost = (postId, newPost) => async(dispatch) => {
    const response = await fetch(`/posts/${postId}/update`, {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newPost)
    })
    if (response.ok){
        const post = await response.json();
        dispatch(editPost(post))
        return null;
    } else if(response.status < 500){
        const data = await response.json();
        if (data.errors) {
            console.log(data.errors)
          return data.errors;
        }
    } else{
        return ['Something went wrong. Please try again.']
    }
}

export const deletePost = (postId) => async(dispatch) => {
    const response = await fetch(`/posts/${postId}`, {
        method:'DELETE',
        headers: {'Content-Type': 'application/json'},
    })
    if(response.ok){
        const data = await response.json();
        dispatch(erasePost(data))
        // return 'Success'
    }
}

// *********************** COMMENTS ***************************

const SPECIFIC_POST_COMMENTS = 'comment/SPECIFIC_POST_COMMENTS';

const allComments = (comments, postId) => ({
    type: SPECIFIC_POST_COMMENTS,
    comments,
    postId
})

export const getComments = (postId) => async(dispatch) => {
    const response = await fetch(`/comments/${postId}`)

    if (response.ok) {
        const comments = await response.json()
        dispatch(allComments(comments, postId))
    }
    return response;
}

const initialState = {}
export default function postReducer(state= initialState, action){
    let newState;
    switch(action.type) {
        case FEED_POSTS:
            newState = {...state}
            action.posts.posts.forEach(post => newState[post.id] = post)
            return newState;
        case CREATE_POSTS:
            newState = {...state};
            newState[action.post.id] = {...action.post};
            return newState;
        case EDIT_POST:
            newState = {...state};
            newState[action.post.id] = {...action.post};
            return newState;
        case DELETE_POST:
            newState = {...state};
            delete newState[action.post.id];
            return newState;
        case SPECIFIC_POST_COMMENTS:
            // newState = {...state};
            newState[action.postId].comments = [...action.comments.comments];
            return newState
        default:
            return state;
    }
}
