import React from "react";
import {Helmet} from "react-helmet";
import {useHistory, useParams, withRouter, NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Images} from "../../../config/Images";
let route = require('../../../utils/route');
export default function NotFound(props) {

    const {t} = useTranslation();
    let history = useHistory();
    return (
        <>
            <Helmet>
                <title>{`${t("app.name")} - ${t('faq.title')}`}</title>
            </Helmet>
            <div className="my-5">
                <div className="container">
                    <div className="row">
                        <div className="col-6" style={{padding: 0}}>
                            <div className="jumbotron bg-dark" style={{margin: 0}}>
                                <h1 className="display-4">{t('common.404_not_found')}</h1>
                                <p className="lead">{t('common.page_you_look_for_not_found')}</p>
                                <hr className="my-4"/>
                                <p>{t('common.you_can_return_to_home_page')}</p>
                                <NavLink to="/" className="btn btn-primary btn-lg" role="button">{t('home.title')}</NavLink>
                            </div>
                        </div>

                        <div className="col-6" style={{
                            backgroundImage: `url(${Images.notfoundillustration})`,
                            padding: 0,
                            backgroundSize: 'contain'
                        }}>

                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}
