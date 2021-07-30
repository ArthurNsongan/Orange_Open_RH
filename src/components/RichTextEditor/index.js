import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
// import Editor from './ckeditor'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import '@ckeditor/ckeditor5-build-classic/build/translations/fr';
// import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
// import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
// import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
// import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';

function RichTextEditor({ onChange, onReady, onBlur, data, className}) {

    // ClassicEditor.create("#CkEditor", {
    //         'language': 'fr',
    //         'maxHeight': '100px',
    //         'plugins': [ Essentials, Paragraph,Bold, Italic, Base64UploadAdapter],
    //         "toolbars": ['paragraph']
    // })

    return (
        <>
            <CKEditor

                config={{
                    'language': 'fr',
                    'extraPlugins': []
                }}
                id="CkEditor"
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