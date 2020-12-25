import Axios from 'axios'
import { AsyncStorage } from '@react-native-community/async-storage';
import SetAuthToken from './setAuthToken'

const configJson = {
    headers: {
        "Content-type": "application/json",
    },
};
// const configForm = (dispatch) => ({
//     headers: {
//         "Content-type": "multipart/form-data",
//     },
//     onUploadProgress: (ProgressEvent) => {
//         let percentage = Math.round(
//             (ProgressEvent.loaded * 100) / ProgressEvent.total
//         );
//         dispatch(showProgress(percentage));
//     },
// });
const baseUrl = 'https://finaltask-tiyas.herokuapp.com/api/v1'

const setToken = async (token) => {
    Axios.defaults.headers.common['Authorization'] = token;
    console.log("PASANG HEEADERS", token);
}

export const loadData = () => async dispatch => {
    console.log("START LOAD DATA");
    // console.log("CEK TOKEN", AsyncStorage.getItem("token"));
    console.log("CEK TOKEN", Axios.defaults.headers.common['Authorization']);
    // if (AsyncStorage.getItem("token")) {
    //     SetAuthToken(AsyncStorage.getItem("token"));
    // }
    try {
        const result = await Axios.get(`${baseUrl}/load`, configJson);
        console.log("CEK DATA", result.data.message);
        dispatch({
            type: "LOAD_DATA",
            payload: result.data.data.user,
        });
    } catch (error) {
        // dispatch({
        //     type: "AUTH_ERROR",
        // });
        console.log("ERROR LOAD DATA", error);
    }
}

export const userLogin = (data) => async (dispatch) => {
    try {
        console.log("START LOGIN");
        const results = await Axios.post(`${baseUrl}/login`, data, configJson)
        console.log("CEK HASIL LOGIn", results.data.message);
        const set = await setToken(results.data.data.user.token)
        console.log("START DISPATCH");
        dispatch({
            type: "LOGIN",
            payload: results.data.data.user
        })
        dispatch(loadData())


    } catch (error) {
        console.log("RESPONSE LOGIN ERROR", error.response);
        alert(error.response.message)
    }
}
export const userRegister = (data) => async dispatch => {
    try {
        const results = await Axios.post(`${baseUrl}/register`, data, configJson)
        const set = await setToken(results.data.data.user)
        dispatch({
            type: "REGISTER",
            payload: results.data.data.user
        })
        dispatch(loadData())
    } catch (error) {
        console.log("ERROR REGISTER", error);
    }
}
export const getPosts = () => async dispatch => {
    try {
        const results = await Axios.get(`${baseUrl}/posts`)
        dispatch({
            type: "GET_POSTS",
            payload: results.data.data.posts
        })
    } catch (error) {
        console.log("ERROR GETPOST", error);
    }
}
// export const editProfile = (data) => async dispatch => {
//     try {
//         const result = await Axios.patch(`${baseUrl}/user`, data, configForm(dispatch))
//         dispatch(loadData())
//         dispatch(showPopUp(result.data.message))
//     } catch (error) {
//         dispatch(showPopUp(error.response.data.message))
//     }
// }
// export const addArts = (data) => async dispatch => {
//     try {
//         const result = await Axios.post(`${baseUrl}/art`, data, configForm(dispatch))
//         dispatch(showPopUp(result.data.message))
//     } catch (error) {
//         dispatch(showPopUp(error.response.data.message))
//     }
// }
// export const getUser = (data) => async dispatch => {
//     try {
//         dispatch(showLoading())
//         const result = await Axios.get(`${baseUrl}/user/${data}`, configJson)
//         if (result) {
//             dispatch({
//                 type: "GET_USER",
//                 payload: result.data.data.user
//             })
//         }
//         dispatch(closeLoading())
//     } catch (error) {
//         dispatch(closeLoading())
//         dispatch(showPopUp(error.response.data.message))
//     }
// }
// export const follow = (data) => async dispatch => {
//     try {
//         dispatch(showLoading())
//         const result = await Axios.post(`${baseUrl}/follow/${data}`)
//         dispatch(closeLoading())
//         dispatch(loadData())
//         dispatch(showPopUp(result.data.message))
//     } catch (error) {
//         dispatch(showPopUp(error.response.data.message))
//     }
// }
// export const logout = () => dispatch => {
//     dispatch({
//         type: "LOGOUT",
//     })
// }
