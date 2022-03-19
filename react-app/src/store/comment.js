// const SPECIFIC_POST_COMMENTS = 'comment/SPECIFIC_POST_COMMENTS';
// const CREATE_COMMENT = 'comment/CREATE_COMMENT';
// const DELETE_COMMENT = 'comment/DELETE_COMMENT';
const GET_ALL_COMMENTS = 'comment/GET_ALL_COMMENTS';

// const allComments = (comments) => ({
//     type: SPECIFIC_POST_COMMENTS,
//     comments
// })

// const makeComment = (comment) => ({
//     type:CREATE_COMMENT,
//     comment
// })

// const removeComment = (comment) => ({
//     type:DELETE_COMMENT,
//     comment
// })

const totalComments = (comments) => ({
    type: GET_ALL_COMMENTS,
    comments
})

// export const getComments = (postId) => async(dispatch) => {
//     const response = await fetch(`/comments/${postId}`)

//     if (response.ok) {
//         const comments = await response.json()
//         dispatch(allComments(comments))
//     }
//     return response;
// }

// export const createComment = (newComment) =>  async(dispatch) => {
//     const response = await fetch(`/comments`, {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(newComment)
//     })

//     if (response.ok){
//         const comment = await response.json()
//         dispatch(makeComment(comment))
//         return null
//     } else if(response.status < 500){
//         const data = await response.json();
//         if (data.errors) {
//             console.log(data.errors)
//           return data.errors;
//         }
//     } else{
//         return ['Something went wrong. Please try again.']
//     }
// }

// export const deleteComment = (commentId) =>  async(dispatch) => {
//     const response = await fetch(`/comments/${commentId}`, {
//         method: 'DELETE',
//         headers: {'Content-Type': 'application/json'},
//     })

//     if (response.ok){
//         const comment = await response.json()
//         dispatch(removeComment(comment))
//     }
// }


export const getAllComments = () => async(dispatch) => {
    const response = await fetch('/comments')

    if(response.ok){
        const data = await response.json()
        dispatch(totalComments(data))
    }
}

const initialState = {allComments:[]};

export default function commentReducer(state = initialState, action){
    let newState;
    switch(action.type){
        // case SPECIFIC_POST_COMMENTS:
        //     newState= {}
        //     action.comments.comments.forEach(comment => newState[comment.id] = comment)
        //     return newState;
        // case CREATE_COMMENT:
        //     newState = {...state};
        //     newState[action.comment.id] = {...action.comment};
        //     return newState;
        case GET_ALL_COMMENTS:
            newState = {...state}
            newState.allComments=[...action.comments.comments];
            return newState;
        default:
            return state;
    }
}
