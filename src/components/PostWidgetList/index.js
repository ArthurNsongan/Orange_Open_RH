import React from "react";
import PropTypes from 'prop-types';
import {useTranslation} from "react-i18next";
import ContentLoader from "react-content-loader";
import * as moment from "moment";
import "./styles.css";

export default function PostWidgetList(props) {

    const {t} = useTranslation();
    const {
        style,
        onClick,
        children,
        posts,
        theme,
        ...rest
    } = props;
    moment.locale("fr");
    const LoaderItem = () => (

        <ContentLoader
            speed={2}
            width="auto"
            height={50}
            viewBox="0 0 250 50"
            backgroundColor="#292929"
            foregroundColor="#8f8f8f"
            {...props}
        >
            <rect x="58" y="18" rx="2" ry="2" width="250" height="10"/>
            <rect x="58" y="34" rx="2" ry="2" width="250" height="10"/>
            <rect x="10" y="18" rx="2" ry="2" width="40" height="10"/>
        </ContentLoader>
    );

    const Loader = () => (
        <>
            <LoaderItem/>
            <LoaderItem/>
            <LoaderItem/>
        </>
    )
    return (

        <div className="col-12 post-widget-list" {...rest}>
            <ul className="o__fil-info w-100 pl-0 mb-0">
                {
                    posts !== null ?
                        posts.map((post, index) => (
                            <li key={index}
                                className="list-group-item bg-gray px-2 d-flex justify-content-center flex-column composite-link border-0">
                                <div className="d-flex lines-2">
                                    <div className={`${theme === 'white' && "text-white"}  d-flex align-items-center`}>
                                        {moment(post.rhContentDateCeated).format("ll")}
                                    </div>
                                    <div className="pl-2">
                            <span className={`${theme === 'white' && "text-white"} font-weight-bold`}>
                                {post.rhContentDomaine.rhContentDomaineName} -
                            </span>
                                        <a className="m_link lines-2 d-inline">
                                <span className={`${theme === 'white' && "text-white"}`}>
                                    {post.rhContentTitle}
                                </span>
                                        </a>
                                    </div>
                                </div>
                            </li>
                        )) :
                        <Loader/>
                }
            </ul>
        </div>
    )
}

PostWidgetList.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onClick: PropTypes.func,
    posts: PropTypes.array,
    theme: PropTypes.oneOf(["white", "black"])
};

PostWidgetList.defaultProps = {
    style: {},
    onClick: () => {
    },
    theme: "black",
    posts: null
};
