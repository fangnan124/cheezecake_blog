import React from 'react'
import { Button, Form, Select, Tab, Table } from 'semantic-ui-react'
import ReactMarkdown from 'react-markdown'
import UserContext from '../contexts/UserContext'
import FormValidationMessage from '../FormValidationMessage'
import TagsSelect from 'components/TagsSelect'
import CodeBlock from 'components/CodeBlock'
import Previews from 'components/Previews'

const options = [
    { key: 'pub', text: 'Published', value: 'published' },
    { key: 'wip', text: 'WIP', value: 'wip' }
]

class _Form extends React.Component {
    static contextType = UserContext;

    static defaultProps = {
        post: {
            title: '',
            content: '',
            tags: [],
            status: ''
        }
    };

    constructor(props) {
        super(props)
        this.state = {
            title: props.post.title,
            content: props.post.content,
            status: props.post.status,
            tags: props.post.tags,
            tag_ids: props.post.tags.map(tag => tag.id),
            imageUrl: props.post.image_url,
            image: null
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
            status: this.state.status,
            post_tag_rels_attributes: post_tag_rels_attributes,
            image: this.state.image
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
                    <label>Image</label>
                    <Previews imageUrl={this.state.imageUrl} onChange={file => this.setState({ image: file })}/>
                </Form.Field>
                <Form.Field>
                    <label>Content</label>
                    <Tab menu={{ secondary: true, pointing: true }} panes={[
                        {
                            menuItem: 'Edit',
                            render: () => (
                                <Form.TextArea
                                    onChange={(e, {value}) => { this.setState({ content: value }) }}
                                    defaultValue={this.state.content}
                                    style={{ height: 500 }}
                                />
                            )
                        },
                        {
                            menuItem: 'Preview',
                            render: () => (
                                <ReactMarkdown
                                    source={this.state.content}
                                    renderers={{ code: CodeBlock, table: Table }}
                                />
                            )
                        }
                    ]}/>
                    <FormValidationMessage errors={this.props.errors} property={'content'}/>
                </Form.Field>
                <Form.Field
                    control={Select}
                    label='Status'
                    options={options}
                    placeholder='Status'
                    width={4}
                    defaultValue={this.state.status}
                    onChange={(e, { value }) => this.setState({ status: value })}
                />
                <Button type='submit'>Save</Button>
            </Form>
        )
    }
}

export default _Form