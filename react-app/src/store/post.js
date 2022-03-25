// *********************** POST ***************************

const FEED_POSTS = 'post/FEED_POSTS';
const CREATE_POSTS = 'post/CREATE_POSTS';
const EDIT_POST = 'post/EDIT_POST';
const DELETE_POST = 'post/DELETE_POST';
const PROFILE_POSTS = 'post/PROFILE_POST';
const GET_ALL_POSTS = 'post/GET_ALL_POSTS';

const allPosts = (allPosts) => ({
    type: GET_ALL_POSTS,
    allPosts
})

const profilePosts = (allPosts) => ({
    type:PROFILE_POSTS,
    allPosts
})
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

export const totalPosts = () => async(dispatch) => {
    const response = await fetch('/posts/all')

    if (response.ok){
        const total = await response.json()
        dispatch(allPosts(total))
    }
}

export const profilePostsComments = (userId) => async(dispatch) => {
    const response = await fetch(`/api/users/${userId}/posts`);

    if(response.ok){
        const total = await response.json();
        dispatch(profilePosts(total))
    }
    return response;
}

export const getFeedPosts = () => async(dispatch) => {
    const response = await fetch('/posts')

    if(response.ok){
        const posts = await response.json()
        dispatch(feedPosts(posts))
    }
    return response;
}

export const createJot = (formData) => async(dispatch) => {
    const response = await fetch('/posts', {
        method: 'POST',
        // headers: {'Content-Type': 'application/json'},
        body: formData
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

export const updatePost = (postId, formData) => async(dispatch) => {
    const response = await fetch(`/posts/${postId}/update`, {
        method:'POST',
        body: formData
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
const CREATE_COMMENT = 'comment/CREATE_COMMENT';
const DELETE_COMMENT = 'comment/DELETE_COMMENT';
const EDIT_COMMENT = 'comment/EDIT_COMMENT';


const allComments = (comments, postId) => ({
    type: SPECIFIC_POST_COMMENTS,
    comments,
    postId
})

const makeComment = (comment) => ({
    type:CREATE_COMMENT,
    comment
})

const removeComment = (comment) => ({
    type:DELETE_COMMENT,
    comment
})

const editComment = (comment) => ({
    type:EDIT_COMMENT,
    comment
})

export const getComments = (postId) => async(dispatch) => {
    const response = await fetch(`/comments/${postId}`)

    if (response.ok) {
        const comments = await response.json()
        dispatch(allComments(comments, postId))
    }
    return response;
}

export const createComment = (formData) =>  async(dispatch) => {
    const response = await fetch(`/comments`, {
        method: 'POST',
        body: formData
    })

    if (response.ok){
        const comment = await response.json()
        dispatch(makeComment(comment))
        return null
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

export const deleteComment = (commentId) =>  async(dispatch) => {
    const response = await fetch(`/comments/${commentId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
    })

    if (response.ok){
        const comment = await response.json()
        dispatch(removeComment(comment))
    }
}

export const updateComment = (commentId, formData) => async(dispatch) => {
    const response = await fetch(`/comments/${commentId}/updates`, {
        method: 'POST',
        body: JSON.stringify(formData)
    })

    if(response.ok){
        const data = await response.json();
        dispatch(editComment(data));
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

const initialState = {}
export default function postReducer(state= initialState, action){
    let newState;
    switch(action.type) {
        case FEED_POSTS:
            newState = {...initialState}
            action.posts.posts.forEach(post => newState[post.id] = post)
            return newState;
        case CREATE_POSTS:
            newState = {...state};
            newState[action.post.id] = {...action.post}

            return newState;
        case EDIT_POST:
            newState = {...state};

            newState[action.post.id] = {...action.post}

            return newState;
        case DELETE_POST:
            newState = {...state};
            delete newState[action.post.id];
            return newState;
        case PROFILE_POSTS:
            newState = {...initialState};
            action.allPosts.total.forEach(post => {
                newState[post.id] = post
            })
            return newState;

        case GET_ALL_POSTS:
            newState = {...initialState};
            action.allPosts.posts.forEach(post => {
                newState[post.id] = post
            })
            return newState;

        // ***************COMMENTS********************

        case SPECIFIC_POST_COMMENTS:
            newState = {...state};
            newState[action.postId].comments = [...action.comments.comments];
            return newState
        case CREATE_COMMENT:
            newState = {...state};
            newState[action.comment.post_id].comments = [{...action.comment}, ...newState[action.comment.post_id].comments];
            return newState;
        case DELETE_COMMENT:
            newState ={...state};
            newState[action.comment.post_id].comments.forEach((comment, i) =>{
                if (comment === action.comment) newState[action.comment.post_id].comments.splice(i, 1)
            });
            newState[action.comment.post_id].comments = [...newState[action.comment.post_id].comments];
            return newState;
        case EDIT_COMMENT:
            newState ={...state};
            newState[action.comment.post_id].comments.forEach((comment, i) =>{
                if (comment.id === action.comment.id) newState[action.comment.post_id].comments.splice(i, 1, {...action.comment})
            });
            newState[action.comment.post_id].comments = [...newState[action.comment.post_id].comments];
            return newState;
        default:
            return state;
    }
}
