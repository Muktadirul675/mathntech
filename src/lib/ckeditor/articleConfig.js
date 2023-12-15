import { ClassicEditor as ClassicEditorBase } from '@ckeditor/ckeditor5-editor-classic';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { Bold, Code, Italic, Strikethrough, Subscript, Superscript, Underline } from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { Link } from '@ckeditor/ckeditor5-link';
import { List } from '@ckeditor/ckeditor5-list';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { Image, ImageCaption, ImageResize, ImageStyle, ImageToolbar, ImageInsert } from '@ckeditor/ckeditor5-image';
import { LinkImage } from '@ckeditor/ckeditor5-link';
import { Base64UploadAdapter } from '@ckeditor/ckeditor5-upload';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';
import { Indent, IndentBlock } from '@ckeditor/ckeditor5-indent';
import { CodeBlock } from '@ckeditor/ckeditor5-code-block';
import { FindAndReplace } from '@ckeditor/ckeditor5-find-and-replace';
import { Font } from '@ckeditor/ckeditor5-font';
import { Highlight } from '@ckeditor/ckeditor5-highlight';
import { HorizontalLine } from '@ckeditor/ckeditor5-horizontal-line';
import { SourceEditing } from '@ckeditor/ckeditor5-source-editing';
import { SpecialCharacters } from '@ckeditor/ckeditor5-special-characters';
import { SpecialCharactersEssentials } from '@ckeditor/ckeditor5-special-characters';
import { Table, TableToolbar,TableCellProperties, TableProperties, TableCaption } from '@ckeditor/ckeditor5-table';
import Math from '@isaul32/ckeditor5-math/src/math';
import AutoformatMath from '@isaul32/ckeditor5-math/src/autoformatmath';
import MathType from '@wiris/mathtype-ckeditor5/src/plugin';

export class ClassicEditor extends ClassicEditorBase { }

ClassicEditor.builtinPlugins = [
    Essentials,
    Autoformat,
    Bold, Code, Italic, Strikethrough, Subscript, Superscript, Underline,
    BlockQuote,
    Heading,
    Link,
    List,
    Paragraph,
    Image, ImageToolbar, ImageCaption, ImageStyle, ImageResize, LinkImage, ImageInsert, Base64UploadAdapter,
    TextTransformation,
    Indent, IndentBlock,
    CodeBlock,
    FindAndReplace,
    Font, Highlight, HorizontalLine, SourceEditing, SpecialCharacters, SpecialCharactersEssentials,
    Table, TableToolbar,TableCellProperties, TableProperties, TableCaption ,
    Math,
	AutoformatMath, MathType
];

ClassicEditor.defaultConfig = {
    toolbar: {
        items: [
            'undo',
            'redo', '|',
            'heading','|',
            'bold', 'italic', 'underline', 'strikethrough', 'code', 'subscript', 'superscript', 'link', 'highlight','blockQuote', '|', 
            'math','codeblock', 'specialCharacters', 'MathType','|', 
            'bulletedList','numberedList', 'outdent', 'indent', 'horizontalLine', '|',
            'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', '|',
            'insertImage', 'insertTable','|',
            'findAndReplace', '|',
            'sourceEditing',
        ]
    },
    image: {
        toolbar: [
            'imageStyle:block',
            'imageStyle:inline',
            'imageStyle:side',
            'imageStyle:margin-left',
            'imageStyle:margin-right',
            'imageStyle:pictures',
            'toggleImageCaption',
            'imageTextAlternative',
            'linkImage',
        ],
        insert: {
            type: 'auto'
        }
    },
    table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells','tableCellProperties', 'tableProperties','toggleTableCaption']
    },
    typing: {
        transformations: {
            include: [
                // Use only the 'quotes' and 'typography' groups.
                'quotes',
                'typography',

                // Plus some custom transformation.
                { from: 'CKE', to: 'CKEditor' },
                { from: 'mnt', to: 'MathNTech' },
            ],
        }
    },
    language: 'en'
};
