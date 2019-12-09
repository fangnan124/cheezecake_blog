import React, {useState, useEffect} from 'react'
import { Button, Form, Select, Tab, Table } from 'semantic-ui-react'
import ReactMarkdown from 'react-markdown'
import FormValidationMessage from 'components/form_validation_message'
import TagsSelect from 'components/tags_select'
import CodeBlock from 'components/code_block'
import Previews from 'components/previews'
import { errorMessage } from 'helpers/form_helper'

const options = [
    { key: 'pub', text: 'Published', value: 'published' },
    { key: 'wip', text: 'WIP', value: 'wip' }
]

const _Form = (props) => {
    const [title, setTitle] = useState(props.post.title)
    const [content, setContent] = useState(props.post.content)
    const [status, setStatus] = useState(props.post.status)
    const [tags, setTags] = useState(props.post.tags)
    const [tagIds, setTagIds] = useState(props.post.tags.map(tag => tag.id))
    const [imageUrl, setImageUrl] = useState(props.post.image_url)
    const [image, setImage] = useState(null)
    const [imageDescription, setImageDescription] = useState(props.post.image_description)

    const submit = (event) => {
        event.preventDefault()

        let post_tag_rels_attributes = []
        let original_tag_ids = []

        tags.forEach(tag => {
            if (tagIds.includes(tag.id)) {
                post_tag_rels_attributes.push({ id: tag.rel_id, tag_id: tag.id })
            } else {
                post_tag_rels_attributes.push({ id: tag.rel_id, _destroy: '1' })
            }
            original_tag_ids.push(tag.id)
        })

        const new_tag_ids = tagIds.filter(tag_id => !original_tag_ids.includes(tag_id))

        new_tag_ids.forEach(tag_id => {
            post_tag_rels_attributes.push({ tag_id })
        })

        let params = {
            title,
            content,
            status,
            post_tag_rels_attributes: post_tag_rels_attributes,
            image_description: imageDescription
        }

        if (image) {
            params['image'] = image
        }

        props.submit(params)
    }

    return (
        <Form onSubmit={submit}>
            <Form.Field>
                <Form.Input
                    fluid
                    label='Title'
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    error={errorMessage({ errors: props.errors, property: 'title' })}
                />
            </Form.Field>
            <Form.Field>
                <TagsSelect
                    label='Tag'
                    selected_tags={tags}
                    onChange={(tag_ids) => setTagIds(tag_ids)}
                    error={errorMessage({ errors: props.errors, property: 'post_tag_rels' })}
                />
            </Form.Field>
            <Form.Field>
                <label>Image</label>
                <Previews imageUrl={imageUrl} onChange={file => setImage(file)}/>
            </Form.Field>
            <Form.Field>
                <Form.Input
                    fluid
                    label='Image Description'
                    type="text"
                    value={imageDescription}
                    onChange={e => setImageDescription(e.target.value)}
                    error={errorMessage({ errors: props.errors, property: 'image_description' })}
                />
            </Form.Field>
            <Form.Field>
                <label>Content</label>
                <Tab menu={{ secondary: true, pointing: true }} panes={[
                    {
                        menuItem: 'Edit',
                        render: () => (
                            <Form.TextArea
                                onChange={(e, {value}) => { setContent(value) }}
                                defaultValue={content}
                                style={{ height: 500 }}
                                error={errorMessage({ errors: props.errors, property: 'content', pointing: 'below' })}
                            />
                        )
                    },
                    {
                        menuItem: 'Preview',
                        render: () => (
                            <ReactMarkdown
                                source={content}
                                renderers={{ code: CodeBlock, table: Table }}
                                escapeHtml={false}
                            />
                        )
                    }
                ]}/>
            </Form.Field>
            <Form.Field
                control={Select}
                label='Status'
                options={options}
                placeholder='Status'
                width={4}
                defaultValue={status}
                onChange={(e, { value }) => setStatus(value)}
                error={errorMessage({ errors: props.errors, property: 'status' })}
            />
            <Button type='submit' primary>Save</Button>
        </Form>
    )
}

_Form.defaultProps = {
    post: {
        title: '',
        content: '',
        tags: [],
        status: '',
        errors: {}
    },
    errors: {}
};

export default _Form