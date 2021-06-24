import React from 'react';
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";
import moment from 'moment';
import 'moment/locale/en-gb';
import 'moment/locale/fr';

export default function Loader(props) {
    const {
        ...rest
    } = props;

    const {i18n, t} = useTranslation();
    console.log(i18n);

    return (
        <div className="d-flex justify-content-center" {...rest}>
            <div className="spinner-border" role="status">
                <span className="sr-only">{t('common.loading')}</span>
            </div>
        </div>
    );
};

Loader.propTypes = {};

Loader.defaultProps = {};