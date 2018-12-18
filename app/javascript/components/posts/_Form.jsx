import React from "react";
import { Button, Form } from 'semantic-ui-react'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import FormValidationMessage from '../FormValidationMessage';

class _Form extends React.Component {
    static defaultProps = {
        post: {
            title: '',
            content: ''
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            title: props.post.title,
            content: props.post.content
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.submit({
            title: this.state.title,
            content: this.state.content
        });
    };

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                    <label>Title</label>
                    <input
                        type="text"
                        value={this.state.title}
                        onChange={e => this.setState({ title: e.target.value })}
                    />
                    <FormValidationMessage errors={this.props.errors} property={"title"}/>
                </Form.Field>
                <Form.Field>
                    <label>Content</label>
                    <CKEditor
                        editor={ ClassicEditor }
                        data={this.state.content}
                        onChange={ (_event, editor) => this.setState({ content: editor.getData() }) }
                    />
                    <FormValidationMessage errors={this.props.errors} property={"content"}/>
                </Form.Field>
                <Button type='submit'>Save</Button>
            </Form>
        )
    }
}

export default _Form;