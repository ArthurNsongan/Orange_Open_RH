import React from 'react';
import './style.css';
import {Images} from "../../config/Images";
import {useTranslation} from "react-i18next";
import {NavLink, useHistory} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

let route = require("../../utils/route");

export default function User(props) {
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
                                            Demandes
                                        </div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">1</div>
                                    </div>
                                    <div clarssName="col-auto">
                                        <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="row">

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
            </div>


        </>
    );
}
