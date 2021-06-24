import React from 'react';
import {useTranslation} from "react-i18next";

export default function AboutOpenRHWidget(props) {
    const {t} = useTranslation();
    return (
        <div className="p-4 mb-3 mt-3 bg-light rounded">
            <h4 className="font-italic">{t('about_widget.title')}</h4>
            <p className="mb-0">{t('about_widget.description')}</p>
        </div>
    )
}