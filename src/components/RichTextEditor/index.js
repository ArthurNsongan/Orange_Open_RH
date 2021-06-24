import React from "react";
import JoditEditor from "jodit-react";
import PropTypes from "prop-types";
import {Constant} from "../../config/Constant";
import {Config} from "../../config/ServerConfig";


export default function RichTextEditor(props) {

    const {
        ref,
        value,
        onBlur
    } = props;
    return (
        <JoditEditor
            ref={ref}
            value={value}
            config={{
                uploader: {
                   insertImageAsBase64URI: true
               },
               /*uploader: {
                    // url: "https://localhost:5003/api/RhContent/PostImage",
                    url: Config.uploadImageUrl, 
                    insertImageAsBase64URI: false,
                    imagesExtensions: [
                        "jpg",
                        "png",
                        "jpeg",
                        "gif"
                    ],
                    //headers: {"token":`${db.token}`},
                   // filesVariableName: 'files',
                   
                    withCredentials: false,
                    pathVariableName: "path",
                    //filesVariableName:"filtext",
                    format: "json",
                    method: "POST",
                    prepareData: function (formdata) {
                    //    let file = formdata.getAll("files[0]")[0];
                        //formdata.append("createTime", (Date.now() / 1000) | 0);
                        // formdata.append("aboutMePic", file);
                        return formdata;
                    },
                    //  isSuccess: function (e) {
                    //     console.log("data success", e);
                    //     const imageUrl = Config.imageFolder + e.image_name;
                    //     //console.log("shuju"+e.length);
                    //     console.log()
                    //     window.open(imageUrl);
                    //     this.selection.insertImage(imageUrl);
                    // //    this.selection.insertImage(resp.data);
                    //    console.log("Inserting Image Done !!!")
                    //   //  this.selection.insertImage(
                    //     // return e.data;
                    // },
                    isSuccess: function (resp) {
                        console.log(resp);
                        alert(resp.imageName);
                        return resp;
                    },
                    getMsg: function (resp) {
                        return "";
                    },
                    process: function (resp) {
                        let imageUrl = Config.imageFolder + resp.imageName;
                        console.log(resp);
                        console.log(resp.imageName);                        
                        return {
                            files: resp[this.options.uploader.pathVariableName] || [],
                            path: "",
                            baseurl: imageUrl,
                            error: "",
                            msg: "",
                        };
                    },
                    defaultHandlerSuccess: function (data, resp) {
                        var i, field = this.options.uploader.pathVariableName;
                        if (data[field] && data[field].length) {
                            for (i = 0; i < data[field].length; i += 1) {
                                alert(data.baseurl);
                                this.selection.insertImage(data.baseurl + data[field][i], null, 250 );
                            }
                        }
                    },
                    defaultHandlerError: function (resp) {
                        this.events.fire('errorPopap', [this.options.uploader.getMsg(resp)]);
                    }
                    // getMessage: function (e) {
                    //     return void 0 !== e.data.msg && Array.isArray(e.data.msg) ? e.data.msg.join("") : ""
                    // },
                    // process: function(resp) {
                    //     // var ss = this;
                    //     console.log("datatext",resp);
                    //     var arrfile = [];
                    //     arrfile.push(resp.data);
                    //     arrfile.unshift(resp.data);
                    //     console.log(arrfile.length + "" + arrfile[0]);
                    //     // this.selection.insertImage(resp.data);
                    //     console.log("Inserting Image Done !!!")
                    //     return {
                    //         files: arrfile, //[this.options.uploader.filesVariableName] || [],
                    //         path: '',
                    //         baseurl: '',
                    //         error: resp.msg,
                    //         msg: resp.msg
                    //     };
                    //     return resp.data;
                    // },
                //     error: function (e) {
                //         this.jodit.events.fire("errorMessage", e.msg, "error", 4e3)
                //     },
                //    defaultHandlerSuccess: function (data,resp) {
                //        console.log("super",data);
                //     // this.selection.insertImage(resp.data);

                //    },
                //     defaultHandlerError: function (e) {
                //         this.jodit.events.fire("errorMessage", e.msg)
                //     },
                //     contentType: function (e) {
                //         return (void 0 === this.jodit.ownerWindow.FormData || "string" == typeof e) &&
                //             "application/x-www-form-urlencoded; charset=UTF-8"
                //     }
                },

               /* uploader: {
                    "url": "https://localhost:5003/api/RhContent/PostImage",
                    "insertImageAsBase64URI": false,
                    "imagesExtensions": [
                      "jpg",
                      "png",
                      "jpeg",
                      "gif"
                    ],
                    "headers": null,
                    "data": null,
                    "filesVariableName": function(e){return"files["+e+"]"},
                    "withCredentials": false,
                    "pathVariableName": "path",
                    "format": "json",
                    "method": "POST",
                    "prepareData": function(e){return e},
                    getMsg: function (resp) {
                        return resp.msg.join !== undefined ? resp.msg.join(' ') : resp.msg;
                    },
                    process: function (resp) {
                        return {
                            files: resp[this.options.uploader.filesVariableName] || [],
                            path: resp.path,
                            baseurl: resp.baseurl,
                            error: resp.error,
                            msg: resp.msg
                        };
                    },
                    error: function (e) {
                      //  this.events.fire('errorPopap', [e.getMessage(), 'error', 4000]);
                      console.log("echec",e.Message)
                      this.jodit.events.fire("errorMessage", e.Messae, "error", 4e3)

                    },
                    defaultHandlerSuccess: function (data, resp) {
                        var i, field = this.options.uploader.filesVariableName;
                        if (data[field] && data[field].length) {
                            for (i = 0; i < data[field].length; i += 1) {
                                this.selection.insertImage(data.baseurl + data[field][i]);
                            }
                        }
                    },                    "defaultHandlerError": function(e){this.j.e.fire("errorMessage",e.message)},
                    "contentType": function(e){return(void 0===this.j.ow.FormData||"string"==typeof e)&&"application/x-www-form-urlencoded; charset=UTF-8"}
                  },*/

                language: "fr",
                toolbarButtonSize: "middle",
                minHeight: 600,
                maxHeight: 650,
                disablePlugins: "about",
                allowResizeX: false,
                allowResizeY: true,
                saveModeInStorage: true,
                colors: Constant.orangeColor
            }}
            tabIndex={1}
            onBlur={onBlur} // preferred to use only this option to update the content for performance reasons
        />
    );
}

RichTextEditor.propTypes = {
    value: PropTypes.string,
    ref: PropTypes.object,
    onBlur: PropTypes.func
};

RichTextEditor.defaultProps = {
    value: "",
    ref: null,
    onBlur: () => {
    }
};
