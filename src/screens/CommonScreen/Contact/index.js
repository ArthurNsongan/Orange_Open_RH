import React from "react";
import {Helmet} from "react-helmet";
import {useHistory, useParams, withRouter, NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Images} from "../../../config/Images";
let route = require('../../../utils/route');

export default function Contact(props) {

    const {t} = useTranslation();
    let history = useHistory();
    return (
        <>
            <Helmet>
                <title>{`${t("app.name")} - ${route.contact.title}`}</title>
            </Helmet>
            <div className="my-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6" style={{padding: 0}}>
                            <div className="jumbotron bg-dark" style={{margin: 0}}>
                                <h1 className="display-4">{route.contact.title}</h1>
                                {/* <p className="lead">{t('common.page_you_look_for_not_found')}</p>
                                <hr className="my-4"/>
                                <p>{t('common.you_can_return_to_home_page')}</p>
                                <NavLink to="/" className="btn btn-primary btn-lg" role="button">{t('home.title')}</NavLink> */}
                            </div>
                        </div>

                        {/* <div className="col-6 mh-100" style={{
                            backgroundImage: `url(${Images.HRBP})`,
                            padding: 0,
                            backgroundSize: 'contain'
                        }}>
                        </div> */}
                        
                        <div className="col-lg-6 p-0">
                            <img src={`${Images.HRBP}`} alt="" style={{"width":'100%', 'objectFit': 'contain'}} />
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}
