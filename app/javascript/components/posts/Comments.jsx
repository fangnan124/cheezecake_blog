import React from 'react'
import {Header, Icon, Button, Comment, Form} from 'semantic-ui-react'
import axios from "axios"

class Comments extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            data: {},
            redirect: false,
            loading: true,
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
            this.setState({ data, loading: false })
        }).catch(error => {
            const { errors } = error.response.data
            this.setState({ errors, loading: false })
        })
    };

    handleDelete = (id) => {
        axios({
            method: 'delete',
            url: `/api/v1/comments/${id}`
        }).then(response => {
            const { data } = response.data
            this.setState({ data})
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
                                <Comment.Author as='a'>{comment.user.email}</Comment.Author>
                                <Comment.Metadata>
                                    <div>{ comment.updated_time_ago }</div>
                                </Comment.Metadata>
                                <Comment.Text>{ comment.text }</Comment.Text>
                                <Comment.Actions>
                                    {
                                        this.state.data.policy.delete && (
                                            <Comment.Action onClick={() => this.handleDelete(comment.id)}>Delete</Comment.Action>
                                        )
                                    }
                                </Comment.Actions>
                            </Comment.Content>
                        </Comment>
                    ))
                }

                {
                    this.state.data.policy.create && (
                        <Form reply onSubmit={this.handleSubmit}>
                            <Form.TextArea onChange={(e, {value}) => {
                                this.setState({ text: value });
                            }}/>
                            <Form.Button content='Add Reply' labelPosition='left' icon='edit' primary/>
                        </Form>
                    )
                }
            </Comment.Group>
        )
    }
}

export default Comments