import { ClassicEditor as ClassicEditorBase } from '@ckeditor/ckeditor5-editor-classic';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { Bold, Code, Italic, Strikethrough, Subscript, Superscript, Underline } from '@ckeditor/ckeditor5-basic-styles';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';
import { FindAndReplace } from '@ckeditor/ckeditor5-find-and-replace';
import { Font } from '@ckeditor/ckeditor5-font';
import { Highlight } from '@ckeditor/ckeditor5-highlight';
import { SourceEditing } from '@ckeditor/ckeditor5-source-editing';
import { SpecialCharacters } from '@ckeditor/ckeditor5-special-characters';
import { SpecialCharactersEssentials } from '@ckeditor/ckeditor5-special-characters';
import Math from '@isaul32/ckeditor5-math/src/math';
import AutoformatMath from '@isaul32/ckeditor5-math/src/autoformatmath';
import MathType from '@wiris/mathtype-ckeditor5/src/plugin';

export class ClassicEditor extends ClassicEditorBase { }

ClassicEditor.builtinPlugins = [
    Essentials,
    Autoformat,
    Bold, Code, Italic, Strikethrough, Subscript, Superscript, Underline,
    Image, 
    TextTransformation,
    FindAndReplace,
    Font, Highlight, SourceEditing, SpecialCharacters, SpecialCharactersEssentials,
    Math,
	AutoformatMath, MathType
];

ClassicEditor.defaultConfig = {
    toolbar: {
        items: [
            'undo',
            'redo', '|',
            'heading','|',
            'bold', 'italic', 'underline', 'strikethrough', 'code', 'subscript', 'superscript',  'highlight', '|', 
            'math','codeblock', 'specialCharacters', 'MathType','|', 
            'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', '|',
            'findAndReplace', '|',
            'sourceEditing',
        ]
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

