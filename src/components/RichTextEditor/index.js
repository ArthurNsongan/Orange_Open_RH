import React from "react";
// import JoditEditor from "jodit-react";
import { Editor } from '@tinymce/tinymce-react';   
import PropTypes from "prop-types";
// import 'tinymce/icons/default';
// import 'tinymce/themes/silver';
// import 'tinymce/plugins/paste';
// import 'tinymce/plugins/link';
// import 'tinymce/plugins/image';
// import 'tinymce/plugins/table';
// import 'tinymce/skins/ui/oxide/skin.min.css';
// import 'tinymce/skins/ui/oxide/content.min.css';
// import 'tinymce/skins/content/default/content.min.css';
// import {Constant} from "../../config/Constant";
import {Config} from "../../config/ServerConfig";


export default function RichTextEditor(props) {

    const {
        ref,
        value,
        onBlur
    } = props;

    console.log("flkdlskdsd", `${process.env.PUBLIC_URL + '/assets/js/tinymce.min.js'}`)

    return (
        <Editor 
            // ref={ref}
            value={value}
            onInit={(evt, editorRef) => editorRef.current = ref}
            onEditorChange={onBlur}
            init={{
                height: 500,
                menubar: true,
                language: "fr_FR",
                plugins: [
                 'advlist autolink lists link image charmap print preview anchor',
                 'searchreplace visualblocks code fullscreen',
                 'insertdatetime media table paste pastetext code help wordcount'
               ],
               toolbar: 'ltr | undo redo | copy paste pastetext | formatselect | image code| ' +
               'bold italic backcolor | alignleft aligncenter ' +
               'alignright alignjustify | bullist numlist outdent indent | ' +
               'removeformat | help',
               content_style: 'img { max-width: 100% !important; } body { font-family:"HelvNeueOrange", Helvetica,Arial,sans-serif; font-size:14px }',
               images_upload_handler: (blobInfo, success, failure, progress) => {
                  var xhr, formData;

                  xhr = new XMLHttpRequest();
                  xhr.withCredentials = false;
                  xhr.open('POST', `${Config.uploadImageUrl}`);

                  xhr.upload.onprogress = function (e) {
                    progress(e.loaded / e.total * 100);
                  };

                  xhr.onload = function() {
                    var json;

                    if (xhr.status === 403) {
                      failure('HTTP Error: ' + xhr.status, { remove: true });
                      return;
                    }

                    if (xhr.status < 200 || xhr.status >= 300) {
                      failure('HTTP Error: ' + xhr.status);
                      return;
                    }

                    json = JSON.parse(xhr.responseText);

                    if (json == null || json.imageName == null || typeof(json.imageName) != "string") {
                        alert(json.imageName);
                        failure("Server error !");
                        return;
                    }

                    // console.log(json);
                    // alert(json.image_name);

                    success(Config.imageFolder + json.imageName);
                  };

                  xhr.onerror = function () {
                    failure('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
                  };

                  formData = new FormData();
                  formData.append('file', blobInfo.blob(), blobInfo.filename());

                  xhr.send(formData);
                },

             }}
        />
        );

    // return (
    //     <JoditEditor
    //         ref={ref}
    //         value={value}
    //         config={{
    //             uploader: {
    //                insertImageAsBase64URI: true
    //            },
    //            /*uploader: {
    //                 // url: "https://localhost:5003/api/RhContent/PostImage",
    //                 url: Config.uploadImageUrl, 
    //                 insertImageAsBase64URI: false,
    //                 imagesExtensions: [
    //                     "jpg",
    //                     "png",
    //                     "jpeg",
    //                     "gif"
    //                 ],
    //                 //headers: {"token":`${db.token}`},
    //                // filesVariableName: 'files',
                   
    //                 withCredentials: false,
    //                 pathVariableName: "path",
    //                 //filesVariableName:"filtext",
    //                 format: "json",
    //                 method: "POST",
    //                 prepareData: function (formdata) {
    //                 //    let file = formdata.getAll("files[0]")[0];
    //                     //formdata.append("createTime", (Date.now() / 1000) | 0);
    //                     // formdata.append("aboutMePic", file);
    //                     return formdata;
    //                 },
    //                 //  isSuccess: function (e) {
    //                 //     console.log("data success", e);
    //                 //     const imageUrl = Config.imageFolder + e.image_name;
    //                 //     //console.log("shuju"+e.length);
    //                 //     console.log()
    //                 //     window.open(imageUrl);
    //                 //     this.selection.insertImage(imageUrl);
    //                 // //    this.selection.insertImage(resp.data);
    //                 //    console.log("Inserting Image Done !!!")
    //                 //   //  this.selection.insertImage(
    //                 //     // return e.data;
    //                 // },
    //                 isSuccess: function (resp) {
    //                     console.log(resp);
    //                     alert(resp.imageName);
    //                     return resp;
    //                 },
    //                 getMsg: function (resp) {
    //                     return "";
    //                 },
    //                 process: function (resp) {
    //                     let imageUrl = Config.imageFolder + resp.imageName;
    //                     console.log(resp);
    //                     console.log(resp.imageName);                        
    //                     return {
    //                         files: resp[this.options.uploader.pathVariableName] || [],
    //                         path: "",
    //                         baseurl: imageUrl,
    //                         error: "",
    //                         msg: "",
    //                     };
    //                 },
    //                 defaultHandlerSuccess: function (data, resp) {
    //                     var i, field = this.options.uploader.pathVariableName;
    //                     if (data[field] && data[field].length) {
    //                         for (i = 0; i < data[field].length; i += 1) {
    //                             alert(data.baseurl);
    //                             this.selection.insertImage(data.baseurl + data[field][i], null, 250 );
    //                         }
    //                     }
    //                 },
    //                 defaultHandlerError: function (resp) {
    //                     this.events.fire('errorPopap', [this.options.uploader.getMsg(resp)]);
    //                 }
    //                 // getMessage: function (e) {
    //                 //     return void 0 !== e.data.msg && Array.isArray(e.data.msg) ? e.data.msg.join("") : ""
    //                 // },
    //                 // process: function(resp) {
    //                 //     // var ss = this;
    //                 //     console.log("datatext",resp);
    //                 //     var arrfile = [];
    //                 //     arrfile.push(resp.data);
    //                 //     arrfile.unshift(resp.data);
    //                 //     console.log(arrfile.length + "" + arrfile[0]);
    //                 //     // this.selection.insertImage(resp.data);
    //                 //     console.log("Inserting Image Done !!!")
    //                 //     return {
    //                 //         files: arrfile, //[this.options.uploader.filesVariableName] || [],
    //                 //         path: '',
    //                 //         baseurl: '',
    //                 //         error: resp.msg,
    //                 //         msg: resp.msg
    //                 //     };
    //                 //     return resp.data;
    //                 // },
    //             //     error: function (e) {
    //             //         this.jodit.events.fire("errorMessage", e.msg, "error", 4e3)
    //             //     },
    //             //    defaultHandlerSuccess: function (data,resp) {
    //             //        console.log("super",data);
    //             //     // this.selection.insertImage(resp.data);

    //             //    },
    //             //     defaultHandlerError: function (e) {
    //             //         this.jodit.events.fire("errorMessage", e.msg)
    //             //     },
    //             //     contentType: function (e) {
    //             //         return (void 0 === this.jodit.ownerWindow.FormData || "string" == typeof e) &&
    //             //             "application/x-www-form-urlencoded; charset=UTF-8"
    //             //     }
    //             },

    //            /* uploader: {
    //                 "url": "https://localhost:5003/api/RhContent/PostImage",
    //                 "insertImageAsBase64URI": false,
    //                 "imagesExtensions": [
    //                   "jpg",
    //                   "png",
    //                   "jpeg",
    //                   "gif"
    //                 ],
    //                 "headers": null,
    //                 "data": null,
    //                 "filesVariableName": function(e){return"files["+e+"]"},
    //                 "withCredentials": false,
    //                 "pathVariableName": "path",
    //                 "format": "json",
    //                 "method": "POST",
    //                 "prepareData": function(e){return e},
    //                 getMsg: function (resp) {
    //                     return resp.msg.join !== undefined ? resp.msg.join(' ') : resp.msg;
    //                 },
    //                 process: function (resp) {
    //                     return {
    //                         files: resp[this.options.uploader.filesVariableName] || [],
    //                         path: resp.path,
    //                         baseurl: resp.baseurl,
    //                         error: resp.error,
    //                         msg: resp.msg
    //                     };
    //                 },
    //                 error: function (e) {
    //                   //  this.events.fire('errorPopap', [e.getMessage(), 'error', 4000]);
    //                   console.log("echec",e.Message)
    //                   this.jodit.events.fire("errorMessage", e.Messae, "error", 4e3)

    //                 },
    //                 defaultHandlerSuccess: function (data, resp) {
    //                     var i, field = this.options.uploader.filesVariableName;
    //                     if (data[field] && data[field].length) {
    //                         for (i = 0; i < data[field].length; i += 1) {
    //                             this.selection.insertImage(data.baseurl + data[field][i]);
    //                         }
    //                     }
    //                 },                    "defaultHandlerError": function(e){this.j.e.fire("errorMessage",e.message)},
    //                 "contentType": function(e){return(void 0===this.j.ow.FormData||"string"==typeof e)&&"application/x-www-form-urlencoded; charset=UTF-8"}
    //               },*/

    //             language: "fr",
    //             toolbarButtonSize: "middle",
    //             minHeight: 600,
    //             maxHeight: 650,
    //             disablePlugins: "about",
    //             allowResizeX: false,
    //             allowResizeY: true,
    //             saveModeInStorage: true,
    //             colors: Constant.orangeColor
    //         }}
    //         tabIndex={1}
    //         onBlur={onBlur}
    //         // preferred to use only this option to update the content for performance reasons
    //     />
    // );
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
