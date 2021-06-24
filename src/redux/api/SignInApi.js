import axios from 'axios';
import {fetchLoginError, fetchLoginPending, fetchLoginReset, fetchLoginSuccess} from "../actions/AuthActions";
import {Config} from "../../config/ServerConfig";

export const signInAction = (userCuid, password) => {

    return dispatch => {
        dispatch(fetchLoginPending());

        axios({
            url: `${Config.loginUrl}`,
            method: 'POST',
            data: {
                userCuid,
                password
            },
        })
            .then(response => {
                console.log(response);
                dispatch(fetchLoginSuccess(response));
            })
            .catch(error => {
                console.warn(error);
                if (error.response)
                    dispatch(fetchLoginError(error.response));
                else if (error.request)
                    dispatch(fetchLoginError(error.request));
                else
                    dispatch(fetchLoginError(error.message));
            });
    }

}

export const signInReset = () => {
    return dispatch => {
        dispatch(fetchLoginReset());
    }
};
