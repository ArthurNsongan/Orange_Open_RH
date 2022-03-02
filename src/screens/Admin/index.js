import React from 'react';
import './style.css';
import {Images} from "../../config/Images";
import {useTranslation} from "react-i18next";
import {NavLink, useHistory} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

let route = require("../../utils/route");

const emp = require('../../employees.json')


export default function Admin(props) {
    console.log("Admin page");
    const {t} = useTranslation();
    let history = useHistory();

    return (
        <>
            <div className="container-fluid dashboard-admin">
                <div className="row">
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-blue shadow h-100 py-2  rounded-sm"
                             style={{border: "1px solid var(--gray)"}}
                             onClick={() => history.push(route.post.admin_post)}>
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold color-blue text-uppercase mb-1">
                                            {t("posts.title")}
                                        </div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">10</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-green shadow h-100 py-2 rounded-sm"
                             style={{border: "1px solid var(--gray)"}} onClick={() => history.push(route.blog.admin_blog)}>
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold color-green text-uppercase mb-1">
                                            {t('blog.title')}
                                        </div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">12</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-orange shadow h-100 py-2 rounded-sm"
                             style={{border: "1px solid var(--gray)"}} onClick={() => history.push(route.testimonial.admin_testimonial)}>
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold color-orange text-uppercase mb-1">{t('testimonial.title')}
                                        </div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">15</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-yellow  shadow h-100 py-2 rounded-sm"
                             style={{border: "1px solid var(--gray)"}} onClick={() => history.push(route.faq.admin_faq)}>
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold color-yellow text-uppercase mb-1">
                                            {t('admin.faq')}
                                        </div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">18</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-comments fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <div className="bg-danger rounded-sm w-100 d-flex py-3 px-3 br-4">
                            <img alt="orange et moi"
                                 src={Images.document} width={108} height={100}/>
                            <div className="ml-2 d-flex flex-column">
                                <h1 className="font-size-18 font-size-lg-24 align-self-center">{t('admin.publication_management')}</h1>
                                <NavLink
                                    style={{width: "max-content"}}
                                    to={{
                                        pathname: route.post.admin_post
                                    }}
                                    className="btn btn-secondary mt-auto"
                                    exact>
                                    {t('common.consulter')}
                                </NavLink>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="bg-purple rounded-sm w-100 d-flex py-3 px-3 br-4">
                            <img alt="orange et moi"
                                 src={Images.announcement} width={108} height={100}/>
                            <div className="ml-2 d-flex flex-column">
                                <h1 className="font-size-18 font-size-lg-24 align-self-center">{t('admin.blog_management')}</h1>
                                <NavLink
                                    style={{width: "max-content"}}
                                    to={{
                                        pathname: route.blog.admin_blog
                                    }}
                                    className="btn btn-secondary mt-auto"
                                    exact>
                                    {t('common.consulter')}
                                </NavLink>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="bg-success rounded-sm w-100 d-flex py-3 px-3 br-4">
                            <img alt="orange et moi"
                                 src={Images.envelope} width={108} height={100}/>
                            <div className="ml-2 d-flex flex-column">
                                <h1 className="font-size-18 font-size-lg-24 align-self-center">{t('admin.demands_management')}</h1>
                                <NavLink
                                    style={{width: "max-content"}}
                                    to={{
                                        pathname: route.blog.admin_blog
                                    }}
                                    className="btn btn-secondary mt-auto"
                                    exact>
                                    {t('common.consulter')}
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-6">
                        <div className="card border-secondary shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary">Development Approach</h6>
                            </div>
                            <div className="card-body text-secondary">
                                <p>SB Admin 2 makes extensive use of Bootstrap 4 utility classes in order to reduce
                                    CSS bloat and poor page performance. Custom CSS classes are used to create
                                    custom components and custom utility classes.</p>
                                <p className="mb-0">Before working with this theme, you should become familiar with the
                                    Bootstrap framework, especially the utility classes.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="card border-secondary shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary">Development Approach</h6>
                            </div>
                            <div className="card-body text-secondary">
                                <p>SB Admin 2 makes extensive use of Bootstrap 4 utility classes in order to reduce
                                    CSS bloat and poor page performance. Custom CSS classes are used to create
                                    custom components and custom utility classes.</p>
                                <p className="mb-0">Before working with this theme, you should become familiar with the
                                    Bootstrap framework, especially the utility classes.</p>

                                    <form className="form">
                            <label>Employée Homme</label>
                            <input type="text" value={emp.personnel_homme} />
                        </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            


        </>
    );
}
