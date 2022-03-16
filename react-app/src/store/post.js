const FEED_POSTS = 'post/FEED_POSTS';
const CREATE_POSTS = 'post/CREATE_POSTS';


const feedPosts = (feed) => ({
    type: FEED_POSTS,
    posts: feed
})

const createPost = (post) => ({
    type: CREATE_POSTS,
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
            newState = {...state}
            action.posts.posts.forEach(post => newState[post.id] = post)
            return newState;
        case CREATE_POSTS:
            newState = {...state};
            newState[action.post.id] = {...action.post};
            return newState;
        default:
            return state;
    }
}
