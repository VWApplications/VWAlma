import React, { Component } from "react";
import { connect } from 'react-redux';
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from 'html-to-draftjs';
import { unemojify } from "node-emoji";
import 'asserts/css/draft.css';

class ControlledEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            create: true
        };
    }

    componentDidMount() {
        const { value, onChange } = this.props.input;
        onChange(value);
        this.__convertHtmlToDraft(value);
    }

    componentWillReceiveProps() {
        const { location } = this.props;
        if (this.state.create && location.state === undefined)
            this.setState({ editorState: EditorState.createEmpty(), create: false })
    }

    __convertHtmlToDraft(html) {
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.setState({ editorState });
        }
    }

    __editorOnChange(editorState) {
        const { onChange, value } = this.props.input;

        const newValue = unemojify(draftToHtml(convertToRaw(editorState.getCurrentContent())));

        if (value !== newValue)
            onChange(newValue);

        this.setState({ editorState });
    };

    __setEditorFocus(ref) {
        this.editorReference = ref;
        if (ref) ref.focus();
        
    }

    render() {
        const { editorState } = this.state;
        const { placeholder, input, meta } = this.props;

        return (
            <div className="row">
                <div className="col-sm-12">
                    <Editor
                        spellCheck
                        onFocus={input.onFocus}
                        onBlur={input.onBlur}
                        editorState={editorState}
                        placeholder={placeholder}
                        onEditorStateChange={(editor) => this.__editorOnChange(editor)}
                        localization={{locale: 'pt'}}
                        editorRef={(ref) => this.__setEditorFocus(ref)}
                        toolbar={{
                            list: { inDropdown: true },
                            textAlign: { inDropdown: true },
                            link: { inDropdown: true },
                            history: { inDropdown: true }
                        }}
                    />
                    {meta.error ?
                        <p className="text-danger">
                            {meta.touched && (meta.error && <span>{meta.error}</span>)}
                        </p>
                    : ""}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { location } = state.router;

    return { location }
}

export default connect(mapStateToProps)(ControlledEditor);