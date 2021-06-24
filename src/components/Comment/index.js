import React from 'react';
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";
import moment from 'moment';
import 'moment/locale/en-gb';
import 'moment/locale/fr';

export default function Comment(props) {
    const {
        title,
        description,
        date,
        author,
        ...rest
    } = props;

    const {i18n, t} = useTranslation();

    return (
        <li className="card mb-3" {...rest}>
            <div className="card-body">
                <h4 className="card-title">{title}</h4>
                <p className="card-text">
                    {description}
                </p>
                {/*<a href="#" className="card-link">0 comment</a>*/}
            </div>
            <p className="card-footer text-muted mb-0">{t('comment.author')} <span
                className="text-primary">{author}</span> —
                {moment(date).format('LL')}</p>
        </li>
    );
};

Comment.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
    author: PropTypes.string,
};

Comment.defaultProps = {
    title: "",
    description: "",
    date: new Date(),
    author: "",
};