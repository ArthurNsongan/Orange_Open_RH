import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import {useTranslation} from "react-i18next";

export default function HelmetMetaData(props) {
    let location = useLocation();
    const {t} = useTranslation();
    let currentUrl = window.location.origin + location.pathname;
    let quote = props.quote !== undefined ? props.quote : "";
    let title = props.title !== undefined ? props.title : t('app.name') + t('app.slogan');
    let image = props.image !== undefined ? props.image : window.location.origin + "/static/media/orange_logo.c1aeeae8.svg";
    let description = props.description !== undefined ? props.description  : t('about_widget.description');
    let hashtag = props.hashtag !== undefined ? props.hashtag : "#orange";
    return (
        <Helmet>
            <title>{title}</title>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="csrf_token" content="" />
            <meta property="type" content="website" />
            <meta property="url" content={currentUrl} />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
            <meta name="theme-color" content="#ffffff" />
            <meta name="_token" content="" />
            <meta name="robots" content="noodp" />
            <meta property="title" content={title} />
            <meta property="quote" content={quote} />
            <meta name="description" content={description} />
            <meta property="image" content={image} />
            <meta property="og:locale" content="fr_FR" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:quote" content={quote} />
            <meta property="og:hashtag" content={hashtag} />
            <meta property="og:image" content={image} />
            <meta content="image/*" property="og:image:type" />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:site_name" content="CampersTribe" />
            <meta property="og:description" content={description} />
        </Helmet>
    );
}
