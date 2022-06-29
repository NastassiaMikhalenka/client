import {authApi} from "../../api/authApi/authApi";

export const initialStateAuth = {
    data: null,
    status: false,
    error: '',
    isLoading: false,
};

export const authReducer = (state = initialStateAuth, action) => {
    switch (action.type) {
        case 'auth/SET_IS_LOGGED_IN':
            return {...state, status: action.payload.status}
        case 'auth/SET_LOADING':
            return {...state, isLoading: action.payload.isLoading}
        case "auth/SET_PROFILE_DATA":
            return {...state, data: action.payload.data}
        case "auth/SET_ERROR":
            return {...state, error: action.payload.error}
        default: {
            return state
        }
    }
};

export const setLoadingAC = (value) => {
    return {
        type: 'auth/SET_LOADING',
        payload: {
            isLoading: value
        }
    }
}


export const setProfileData = (data) => {
    return {
        type: 'auth/SET_PROFILE_DATA',
        payload: {
            data: data
        }
    }
}


export const setIsLoggedInAC = (status) => {
    return {
        type: 'auth/SET_IS_LOGGED_IN',
        payload: {
            status: status,
        },
    }
};

export const setErrorAC = (error) => {
    return {
        type: 'auth/SET_ERROR',
        payload: {
            error: error,
        },
    }
};

export const loginTC = (params) => {
    return (dispatch) => {
        dispatch(setLoadingAC(false));
        authApi.login(params)
            .then((res) => {
                console.log(res.data)
                dispatch(setProfileData(res.data))
                if ('token' in res.data) {
                    window.localStorage.setItem('token', res.data.token);
                }
                dispatch(setIsLoggedInAC(true))
                dispatch(setErrorAC(''))
            })
            .catch(e => {
                dispatch(setErrorAC(e.response ? e.response.data.message : e.message))
            })
            .finally(() => {
                dispatch(setLoadingAC(true));
            })
    }
};