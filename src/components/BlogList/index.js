import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {useTranslation} from "react-i18next";
import {NavLink} from "react-router-dom";
import chunk from 'lodash/chunk';
import Slider from "../Slider";
import {FakeData} from "../../fakeData";
import "./style.css";
import {Constant} from "../../config/Constant";
import ReactPaginate from "react-paginate";
import * as moment from 'moment';
import 'moment/locale/fr';
import Interweave from "interweave";
import * as Utils from "../../utils";
import {Config} from "../../config/ServerConfig";
import _ from "lodash";

let route = require("../../utils/route");
export default function BlogList(props) {
    moment.locale("fr");
    const {t} = useTranslation();
    const {
        style,
        onClick,
        blogs,
        children,
        ...rest
    } = props;

    const totalPosts = blogs.filter((blog) => blog.rhContentPriorityLevel !== 1).length;
    const totalPage = Math.ceil(totalPosts / Constant.blogPageLimit);

    const [currentBlogs, setCurrentBlogs] = useState(blogs.filter((blog) => blog.rhContentPriorityLevel !== 1).slice(0, Constant.blogPageLimit));

    useEffect(() => {
        setCurrentBlogs(blogs.filter((blog) => blog.rhContentPriorityLevel !== 1).slice(0, Constant.blogPageLimit));
    }, [props.blogs]);

    useEffect(() => {
        window.$(".img-post").initImageNotLoadPlaceHolder();
    });

    const handlePageChange = data => {
        const offset = (data.selected) * Constant.blogPageLimit;
        setCurrentBlogs(blogs.filter((blog) => blog.rhContentPriorityLevel !== 1).slice(offset, offset + Constant.blogPageLimit));
    };

    console.log("Blogs", blogs);

    return (

        <>
            {
                blogs.length === 0 ?

                    <div className="alert alert-info" role="alert">
                        <span className="alert-icon"><span className="sr-only">Info</span></span>
                        <p>{t('blog.no_blog')}</p>
                    </div> :

                    <>
                        <Slider pagination
                                slides={blogs.filter((blog) => blog.rhContentPriorityLevel === 1)}
                                renderItem={(slide) => (
                                    <div className="jumbotron slider-blog p-4 p-md-5 text-white rounded"
                                         style={{backgroundImage: `url(${!_.isNil(slide.rhContentPrincipalLink) ? (Config.imageFolder + slide.rhContentPrincipalLink) : "https://picsum.photos/840/400"})`}}>
                                        <div className="col-md-6 px-0">
                                            <h1 className="display-4 font-italic">{slide.rhContentTitle}</h1>
                                            <p className="lead my-3">
                                                <Interweave
                                                    content={Utils.cutString(Utils.removeTag(slide.rhContentDescription), 100)}/>
                                            </p>
                                            <p className="lead mb-0">
                                                <NavLink
                                                    to={{
                                                        pathname: `${route.blog.root}/${slide.rhContentDomaineId}/${slide.rhContentId}`,
                                                        slide
                                                    }}
                                                    role="button"
                                                    className="text-white font-weight-bold">
                                                    {t('common.read_more')}
                                                </NavLink>
                                            </p>
                                        </div>
                                    </div>
                                )}
                        />
                        {
                            chunk(currentBlogs, 2).map((row, index) => (
                                <div className="row mb-3" key={`row-${index}`}>
                                    {
                                        row.map((blog, i) => (
                                            <div className="col-12 col-md-6 col-lg-6" key={`blog-${i}`}>
                                                <div className="card">
                                                    <img
                                                        src={!_.isNil(blog.rhContentPrincipalLink) ? (Config.imageFolder + blog.rhContentPrincipalLink) : "https://picsum.photos/400/200"}
                                                        width="400" height="200"
                                                        className="card-img-top img-post"
                                                        loading="lazy"
                                                        alt={blog.rhContentTitle}/>
                                                    <div className="card-body">
                                                        <h5 className="card-title">{blog.rhContentTitle}</h5>
                                                        <p className="card-text">
                                                            <Interweave
                                                                content={Utils.removeTag(Utils.cutString(blog.rhContentDescription, 200))}/>
                                                        </p>
                                                        <p className="card-text">
                                                            <small
                                                                className="text-muted">{moment(blog.rhContentDateCeated).format("lll")}</small>
                                                        </p>
                                                        <NavLink
                                                            to={{
                                                                pathname: `${route.blog.root}/${blog.rhContentDomaineId}/${blog.rhContentId}`,
                                                                blog
                                                            }}
                                                            role="button"
                                                            className="btn btn-primary btn-secondary btn-sm">
                                                            {t('common.read_more')}
                                                        </NavLink>
                                                    </div>

                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            ))
                        }
                        <nav role="navigation" aria-label="Pagination example with active span item">
                            <ReactPaginate
                                previousLabel={<span className="sr-only"> {t('common.previous')}</span>}
                                nextLabel={<span className="sr-only"> {t('common.next')}</span>}
                                breakLabel={'...'}
                                breakClassName={'page-item'}
                                breakLinkClassName={'page-link'}
                                pageCount={totalPage}
                                pageClassName={'page-item'}
                                pageLinkClassName={'page-link'}
                                marginPagesDisplayed={2}
                                onPageChange={handlePageChange}
                                previousClassName={'page-item'}
                                previousLinkClassName={'page-link'}
                                nextLinkClassName={'page-link'}
                                nextClassName={'page-item'}
                                pageRangeDisplayed={Constant.blogPageLimit}
                                containerClassName={'pagination justify-content-center'}
                                activeClassName={'active'}
                            />
                        </nav>
                    </>
            }
        </>
    )
};

BlogList.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onClick: PropTypes.func,
    blogs: PropTypes.array
};

BlogList.defaultProps = {
    style: {},
    onClick: () => {
    },
    blogs: []
};
