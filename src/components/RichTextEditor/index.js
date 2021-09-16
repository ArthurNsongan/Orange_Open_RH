import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Editor from 'ckeditor5-custom-build'
import 'ckeditor5-custom-build/build/translations/fr'
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
// import '@ckeditor/ckeditor5-build-classic/build/translations/fr';
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
                    toolbar: {
					items: [
						'heading',
						'|',
						'bold',
						'italic',
						'bulletedList',
						'numberedList',
						'|',
						'outdent',
						'indent',
						'|',
						'imageUpload',
						'fontColor',
						'fontBackgroundColor',
						'link',
						'fontFamily',
						'fontSize',
						'blockQuote',
						'insertTable',
						'mediaEmbed',
						'undo',
						'redo'
					]
				},
				language: 'fr',
				image: {
					toolbar: [
						'imageTextAlternative',
						'imageStyle:inline',
						'imageStyle:block',
						'imageStyle:side'
					]
				},
				table: {
					contentToolbar: [
						'tableColumn',
						'tableRow',
						'mergeTableCells'
					]
				},
					licenseKey: '',
				}}
                id="CkEditor"
                editor={Editor}
                className={className}
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