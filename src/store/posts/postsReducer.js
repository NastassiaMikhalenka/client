import {postsApi} from "../../api/postsApi/postsApi";
import {setErrorAC} from "../auth/authReducer";

export const initialStatePosts = {
    posts: [],
    tags: [],
    isPostsLoading: false,
    isTagsLoading: false,
    error: '',
};

export const postsReducer = (state = initialStatePosts, action) => {
    switch (action.type) {
        case 'posts/SET_POSTS':
            return {...state, posts: action.payload.posts}
        case 'posts/SET_TAGS':
            return {...state, tags: action.payload.tags}
        case 'posts/SET_LOADING_POSTS':
            return {...state, isPostsLoading: action.payload.isPostsLoading}
        case 'posts/SET_LOADING_TAGS':
            return {...state, isTagsLoading: action.payload.isTagsLoading}
        default: {
            return state
        }
    }
};


export const setPosts = (data) => {
    return {
        type: 'posts/SET_POSTS',
        payload: {
            posts: data
        }
    }
}


export const setTags = (data) => {
    return {
        type: 'posts/SET_TAGS',
        payload: {
            tags: data
        }
    }
}


export const setLoadingPostsAC = (value) => {
    return {
        type: 'posts/SET_LOADING_POSTS',
        payload: {
            isPostsLoading: value
        }
    }
}

export const setLoadingTagsAC = (value) => {
    return {
        type: 'posts/SET_LOADING_TAGS',
        payload: {
            isTagsLoading: value
        }
    }
}


export const fetchPostTC = () => {
    return (dispatch) => {
        dispatch(setLoadingPostsAC(false));
        postsApi.fetchPosts()
            .then((res) => {
                dispatch(setPosts(res.data))
            })
            .catch(e => {
                dispatch(setErrorAC(e.response ? e.response.data.message : e.message))
            })
            .finally(() => {
                dispatch(setLoadingPostsAC(true));
            })
    }
};


export const fetchTagsTC = () => {
    return (dispatch) => {
        dispatch(setLoadingTagsAC(false));
        postsApi.fetchTags()
            .then((res) => {
                dispatch(setTags(res.data))
                // dispatch(setErrorAC(''))
            })
            .catch(e => {
                dispatch(setErrorAC(e.response ? e.response.data.message : e.message))
            })
            .finally(() => {
                dispatch(setLoadingTagsAC(true));
            })
    }
};