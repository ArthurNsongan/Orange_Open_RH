import React from 'react';
import PropTypes from "prop-types";
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from "react-dropzone-uploader/dist/Dropzone";
import {useTranslation} from "react-i18next";

export default function DropzoneUploader(props) {

    const {t} = useTranslation();
    const {
        style,
        onClick,
        children,
        comments,
        ...rest
    } = props;
    // specify upload params and url for your files
    const getFileUploadParams = ({file, meta}) => {
        const body = new FormData();
        body.append('fileField', file);
        return {url: 'https://httpbin.org/post', body}
    };

    // called every time a file's `status` changes
    const handleVideoChangeStatus = ({meta, file}, status) => {
        console.log(status, meta, file);
    };

    const handleSubmit = (files, allFiles) => {
        console.log(files.map(f => f.meta));
        allFiles.forEach(f => f.remove());
    };

    return (
        <Dropzone
            getUploadParams={getFileUploadParams}
            onChangeStatus={handleVideoChangeStatus}
            onSubmit={handleSubmit}
            inputContent={t('add_post.drad_drop_or_select')}
            styles={{
                dropzone: {
                    flex: "1 1 0%",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "10px",
                    borderWidth: "2px",
                    borderRadius: "2px",
                    borderColor: "rgb(238, 238, 238)",
                    borderStyle: "dashed",
                    backgroundColor: "rgb(250, 250, 250)",
                    color: "rgb(189, 189, 189)",
                    outline: "none",
                    transition: "border 0.24s ease-in-out 0s",
                    position: "normal",
                    minHeight: "auto"
                },
                inputLabel: {
                    color: "rgb(189, 189, 189)",
                    fontSize: "1rem",
                    fontWeight: "normal"
                }
            }}
            accept="video/*"
        />
    );
};

DropzoneUploader.propTypes = {};

DropzoneUploader.defaultProps = {};
