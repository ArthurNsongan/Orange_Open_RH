import {Constant} from "../config/Constant";
import {Language} from '../lang/Language';
import _ from 'lodash';

export const toCamelCase = (word) => {
    let regex = /[A-Z\xC0-\xD6\xD8-\xDE]?[a-z\xDF-\xF6\xF8-\xFF]+|[A-Z\xC0-\xD6\xD8-\xDE]+(?![a-z\xDF-\xF6\xF8-\xFF])|\d+/g;
    return word.match(regex);
};

export const baseStyle = {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

export const activeStyle = {
    borderColor: '#2196f3'
};

export const acceptStyle = {
    borderColor: '#00e676'
};

export const rejectStyle = {
    borderColor: '#ff1744'
};

export const thumbsContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

export const thumbStyle = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

export const thumbStyleVideo = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: "auto",
    height: "auto",
    padding: 4,
    boxSizing: 'border-box'
};

export const thumbInnerStyle = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

export const thumbInnerStyleVideo = {
    display: 'flex',
    minWidth: 0,
};

export const imgStyle = {
    display: 'block',
    width: 'auto',
    height: '100%'
};

export const removeImgTag = (str) => {
    if ((str === null) || (str === '') || (str === undefined))
        return false;
    else
        str = str.toString();
    return str.replace(/<img[^>]*>/g, '');
};

export const removeTag = (str) => {
    if ((str === null) || (str === '') || (str === undefined))
        return "";
    else
        str = str.toString();
    return str.replace(/<[^>]*>/g, '');
};

export const cutString = (word, max) => {
    return word === null ? '' : `${word.slice(0, max)}...`;
};

export const isAdmin = () => {
    if (!_.isNil(localStorage.getItem('USER')) && JSON.parse(localStorage.getItem('USER')).userRole)
    {
        console.log("verification",localStorage.getItem('USER'));
        return JSON.parse(localStorage.getItem('USER')).userRole.userRoleName === Constant.adminRole;

    }
    else
        return false;
};

export const isConnected = () => {
    return !_.isNil(localStorage.getItem('USER'));
};

export const getUserConnected = () => {
    if (isConnected())
        return JSON.parse(localStorage.getItem('USER'));
    else
        return null;
};

export const isImageFileUrl = (url) => {
    if(url===null)
    return false;
    
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
};

export const displayErrorRequest = (error) => {
    switch (true) {
        case (error.status >= 500 && error.status <= 511) :
            return 'error.internal_server_error';

        case error.status === 400 :
            return error.data;

        case error.status === 401 :
            return 'error.unauthorized';

        case error.status === 403 :
            return 'error.forbidden';

        case error.status === 404 :
            return 'error.not_found';

        case error.status === 408 :
            return 'error.time_out';

        default:
            return 'error.error_occured'
    }
};

export const getFileExtension = (filePath) => {
    return filePath.split('.').pop();
};

export const getErrorMessage = (error) => {
    switch (error.status) {
        case 400:
            return "error.bad"
    }
};

export const languageUpdater = () => {
    let defaultLanguage = Language.FR;
    let currentLanguage = localStorage.getItem("i18nextLng");
    let actualLanguage = ( currentLanguage === "" || currentLanguage == null ) ? defaultLanguage : currentLanguage;
    alert("actualLanguage : " + actualLanguage);
    return actualLanguage;
}

