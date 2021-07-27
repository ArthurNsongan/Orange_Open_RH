import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
// import '@ckeditor/ckeditor5-build-classic/build/translations/fr';
// import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
// import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
// import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
// import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
// import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter';

function RichTextEditor({ onChange, onReady, onBlur, data, className}) {

    // ClassicEditor.create({
    //     'language': 'fr'
    // })

    return (
        <>
            <CKEditor
                config={{
                    'language': 'fr',
                    'height': '100px',
                    // 'plugins': [ "Base64UploadAdapter"],
                }}
                className={className}
                editor={ClassicEditor}
                onReady={ (editor) => {
                    console.log(editor)
                }}
                data={data}
                onChange={ (event, editor) => {
                    console.log(editor.getData())
                    onChange(editor)
                }}
                onBlur={ (event, editor) => {

                }}
                onFocus={ (event, editor) => {

                }}
            />
        </>
    )
}

export default RichTextEditor