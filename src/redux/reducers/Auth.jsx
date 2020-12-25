import { AsyncStorage } from "@react-native-community/async-storage";

const innitialState = {
    isLogin: false,
    userData: null,
    token: null,
    loading: true,
    user: null,
    posts: null,
    loadingPosts: true,
};

const Auth = (state = innitialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case "GET_POSTS":
            return {
                ...state,
                posts: payload,
                loadingPosts: false
            }
        case "LOAD_DATA": {
            return {
                ...state,
                userData: payload,
                isLogin: true,
                loading: false
            }
        }
        case "LOGIN":
            // AsyncStorage.setItem("token", payload.token);
            return {
                ...state,
                token: payload.token
            }
        case "REGISTER":
            // AsyncStorage.setItem("token", payload);
            return {
                ...state,
                token: payload
            }
        case "LOGOUT":
            AsyncStorage.removeItem("token");
        case "AUTH_ERROR":
            return {
                ...innitialState,
                loading: false,
            }
        default:
            return state;
    }
}

export default Auth;