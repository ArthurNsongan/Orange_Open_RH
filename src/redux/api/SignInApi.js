import axios from 'axios';
import {fetchLoginError, fetchLoginPending, fetchLoginReset, fetchLoginSuccess} from "../actions/AuthActions";
import {Config} from "../../config/ServerConfig";
import moment from 'moment';

export const signInAction = (userCuid, password) => {

    let connect_try = localStorage.getItem("USER_CONNECT_TRY");

    if(connect_try != undefined) {
        let number = parseInt(connect_try)
        let last_try_date = localStorage.getItem("USER_CONNECTED_TRY_DATE")
        if(last_try_date != undefined) {
            let now = moment(new Date().toISOString());
            let date = moment(last_try_date)
            var daysLeft = now.diff(date,"days")
            if( daysLeft >= 1) {
                localStorage.setItem("USER_CONNECT_TRY", '0');
                localStorage.removeItem("USER_CONNECTED_TRY_DATE");
            } else {
                if(number >= 5) {
                    localStorage.setItem("USER_CONNECTED_TRY_DATE", new Date().toISOString());
                    return dispatch => { dispatch(fetchLoginError({ data: "Le compte est bloqué. Contactez l'administrateur pour le débloquer."})); }
                }
            }
        } else if(number >= 5) {
            localStorage.setItem("USER_CONNECTED_TRY_DATE", new Date().toISOString());
            return dispatch => { dispatch(fetchLoginError({ data: "Le compte est bloqué. Contactez l'administrateur pour le débloquer."})); }
        }
    }

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
            if (error.response) {
                let connect_try = localStorage.getItem("USER_CONNECT_TRY");
                if(connect_try != undefined) {
                    let number = parseInt(connect_try)
                    if(number < 5) {
                        localStorage.setItem("USER_CONNECT_TRY", number + 1);
                        dispatch(fetchLoginError(error.response));
                    }
                } else {
                    localStorage.setItem("USER_CONNECT_TRY", '0');
                }
            }
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
