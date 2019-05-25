import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import TagsSelect from 'components/TagsSelect'
import FormValidationMessage from '../FormValidationMessage'

class _Form extends React.Component {
    static defaultProps = {
        post: {
            title: '',
            content: '',
            tags: []
        }
    };

    constructor(props) {
        super(props)
        this.state = {
            title: props.post.title,
            content: props.post.content,
            tags: props.post.tags,
            tag_ids: props.post.tags.map(tag => tag.id)
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()

        let post_tag_rels_attributes = []
        let original_tag_ids = []

        this.state.tags.forEach(tag => {
            if (this.state.tag_ids.includes(tag.id)) {
                post_tag_rels_attributes.push({ id: tag.rel_id, tag_id: tag.id })
            } else {
                post_tag_rels_attributes.push({ id: tag.rel_id, _destroy: '1' })
            }
            original_tag_ids.push(tag.id)
        })

        const new_tag_ids = this.state.tag_ids.filter(tag_id => !original_tag_ids.includes(tag_id))

        new_tag_ids.forEach(tag_id => {
            post_tag_rels_attributes.push({ tag_id })
        })

        this.props.submit({
            title: this.state.title,
            content: this.state.content,
            post_tag_rels_attributes: post_tag_rels_attributes
        })
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
                    <FormValidationMessage errors={this.props.errors} property={'title'}/>
                </Form.Field>
                <Form.Field>
                    <label>Tag</label>
                    <TagsSelect
                        selected_tags={this.state.tags}
                        onChange={(tag_ids) => this.setState({ tag_ids: tag_ids })}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Content</label>
                    <CKEditor
                        editor={ ClassicEditor }
                        data={this.state.content}
                        onChange={ (_event, editor) => this.setState({ content: editor.getData() }) }
                    />
                    <FormValidationMessage errors={this.props.errors} property={'content'}/>
                </Form.Field>
                <Button type='submit'>Save</Button>
            </Form>
        )
    }
}

export default _Form