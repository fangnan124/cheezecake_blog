import React from 'react'
import { Button, Form, Select, Tab, Table } from 'semantic-ui-react'
import TagsSelect from 'components/TagsSelect'
import FormValidationMessage from '../FormValidationMessage'
import UserContext from '../contexts/UserContext'
import ReactMarkdown from 'react-markdown'
import CodeBlock from '../CodeBlock'

import {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};


const Previews = (props) => {
    const [files, setFiles] = useState([]);
    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
            console.log(acceptedFiles[0]);
            props.onChange(acceptedFiles[0]);
        }
    });

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                />
            </div>
        </div>
    ));

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <section className="container">
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside style={thumbsContainer}>
                {thumbs}
            </aside>
        </section>
    );
}

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
                <Previews onChange={file => this.setState({ image: file })}/>
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