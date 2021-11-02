import React from 'react';
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";
import moment from 'moment';
import 'moment/locale/en-gb';
import {useHistory} from "react-router-dom";
import 'moment/locale/fr';
import './style.css';
import {useDispatch} from "react-redux";
import {fetchLoginReset} from "../../redux/actions/AuthActions";
import {languageUpdater} from "../../utils";

let route = require('../../utils/route');

export default function ProfileDropdown(props) {
    const {
        ...rest
    } = props;

    const {i18n, t} = useTranslation();
    const dispatch = useDispatch();
    let history = useHistory();

    const disconnect = () => {
        const actualLanguage = languageUpdater();
        localStorage.clear();
        let currentLanguage = localStorage.setItem("i18nextLng", actualLanguage);
        dispatch(fetchLoginReset());
        history.push("/");
    };

    return (
        <li className="nav-item dropdown profile-dropdown ml-auto">
            <a href="#" className="nav-link nav-icon icon-avatar" data-toggle="dropdown" role="button"
               aria-haspopup="true" aria-expanded="false" style={{transform: "scale(1.5)" }}/>
            <ul className="dropdown-menu dropdown-menu-right">
                <li><a className="dropdown-item" href="#" onClick={disconnect}>{t('common.logout')}</a></li>
                <li><a className="dropdown-item" href="#">{t('common.settings')}</a></li>
            </ul>
        </li>
    );
};

ProfileDropdown.propTypes = {};

ProfileDropdown.defaultProps = {};
