import React from 'react'
import {Header, Button, Comment, Form} from 'semantic-ui-react'
import axios from 'axios'

class Comments extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            data: {},
            redirect: false,
            loading: true,
            edit_id: null,
            edit_text: '',
            errors: {}
        }
    }

    componentDidMount() {
        this.setState({ loading: true })
        axios({
            method: 'get',
            url: `/api/v1/posts/${this.props.postId}/comments`,
            // params: { page: page }
        }).then(response => {
            const { data } = response.data
            this.setState({ data, loading: false })
        }).catch(error => {
            const { errors } = error.response.data
            this.setState({ errors, loading: false })
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({ loading: true })
        axios({
            method: 'post',
            url: `/api/v1/posts/${this.props.postId}/comments`,
            data: { text: this.state.text }
        }).then(response => {
            const { data } = response.data
            this.setState({ data, loading: false, edit_id: null, edit_text: '' })
        }).catch(error => {
            const { errors } = error.response.data
            this.setState({ errors, loading: false })
        })
    };

    handleUpdate = (event) => {
        event.preventDefault()
        axios({
            method: 'put',
            url: `/api/v1/comments/${this.state.edit_id}`,
            data: { text: this.state.edit_text }
        }).then(response => {
            const { data } = response.data
            this.setState({ data, edit_id: null, edit_text: '' })
        }).catch(error => {
            const { errors } = error.response.data
            this.setState({ errors })
        })
    };

    handleDelete = (id) => {
        axios({
            method: 'delete',
            url: `/api/v1/comments/${id}`
        }).then(response => {
            const { data } = response.data
            this.setState({ data, edit_id: null, edit_text: '' })
        }).catch(error => {
            const { errors } = error.response.data
            this.setState({ errors })
        })
    };

    render() {
        if (this.state.loading) return null
        return (
            <Comment.Group>
                <Header as='h3' dividing>
                    Comments
                </Header>

                {
                    this.state.data.comments.map((comment) => (
                        <Comment key={comment.id}>
                            <Comment.Content>
                                <Comment.Author as='a'>{comment.user.name}</Comment.Author>
                                <Comment.Metadata>
                                    <span>{ comment.created_time_ago }</span>
                                </Comment.Metadata>
                                {
                                    this.state.edit_id === comment.id ? (
                                        <Form reply onSubmit={this.handleUpdate}>
                                            <Form.TextArea
                                                onChange={(e, {value}) => { this.setState({ edit_text: value }) }}
                                                defaultValue={comment.text}
                                                style={{ height: '6em' }} // default is 12em, rows does not work here.
                                            />
                                            <Button content='Update' labelPosition='left' icon='edit' primary/>
                                            <Button content='Cancel' labelPosition='left' icon='close' type='button' onClick={() => this.setState({ edit_id: null, edit_text: '' })}/>
                                        </Form>
                                    ) : (
                                        <div>
                                            <Comment.Text>{ comment.text }</Comment.Text>
                                            <Comment.Actions>
                                                {
                                                    this.state.data.policy.edit && (
                                                        <Comment.Action onClick={() => this.setState({ edit_id: comment.id })}>
                                                            Edit
                                                        </Comment.Action>
                                                    )
                                                }
                                                {
                                                    this.state.data.policy.delete && (
                                                        <Comment.Action onClick={() => this.handleDelete(comment.id)}>
                                                            Delete
                                                        </Comment.Action>
                                                    )
                                                }
                                            </Comment.Actions>
                                        </div>
                                    )
                                }
                            </Comment.Content>
                        </Comment>
                    ))
                }

                {
                    this.state.data.policy.create && (
                        <Form reply onSubmit={this.handleSubmit}>
                            <Form.TextArea
                                onChange={(e, {value}) => {this.setState({ text: value })}}
                                style={{ height: '6em' }} // default is 12em, rows does not work here.
                            />
                            <Form.Button content='Add Reply' labelPosition='left' icon='edit' primary/>
                        </Form>
                    )
                }
            </Comment.Group>
        )
    }
}

export default Comments