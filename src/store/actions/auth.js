import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

// user will be logged out in an hour 
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime*1000);
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        // https://firebase.google.com/docs/reference/rest/auth/
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDT56LDTDaOG7EV79gSdxsLK-6vLTogFRU';
        // console.log('IS SIGNUP ', isSignup);
        if (!isSignup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDT56LDTDaOG7EV79gSdxsLK-6vLTogFRU';
        }
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date( new Date().getTime() + response.data.expiresIn*1000 );
                // use built-in javascript function localStorage.setItem(key, value), check in application
                localStorage.setItem('token', response.data.idToken)
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout())
        } else {
            // retrieve the string value from getItem() and convert into a Date object
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (new Date() <= expirationDate) {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId)); 
                // calculate remaining time before expiration, convert it back to seconds
                const timeLeft = (expirationDate.getTime() - new Date().getTime())/1000;
                dispatch(checkAuthTimeout(timeLeft));
            } else {
                dispatch(logout());
            }
        }
    };
};