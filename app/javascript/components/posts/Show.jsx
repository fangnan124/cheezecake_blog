import React from 'react'
import axios from 'axios'
import {Header, Modal, Button, Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import Tag from 'components/Tag'
import Comments from './Comments'
import { UserConsumer } from 'components/contexts/UserContext'
import ReactMarkdown from 'react-markdown'
import CodeBlock from '../CodeBlock'
import { Redirect } from 'react-router-dom'

class Show extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            errors: {},
            loading: true,
            redirect: false,
            modal: {
                open: false
            }
        }
    }

    componentDidMount() {
        this.setState({ loading: true })
        axios({
            method: 'get',
            url: `/api/v1/posts/${this.props.match.params.id}`
        }).then(response => {
            const { data } = response.data
            this.setState({ data, loading: false })
        }).catch(error => {
            const { errors } = error.response.data
            this.setState({ errors, loading: false })
        })
    }

    delete = () => {
        this.setState({ loading: true })
        axios({
            method: 'delete',
            url: `/api/v1/posts/${this.props.match.params.id}`
        }).then(() => {
            this.setState({ redirect: true })
        }).catch(error => {
            const { errors } = error.response.data
            this.setState({ errors, loading: false })
        })
    };

    open = () => {
        this.setState({ modal: { open: true } })
    };

    close = () => {
        this.setState({ modal: { open: false } })
    };

    render() {
        if (this.state.redirect) return <Redirect to={{ pathname: '/posts' }} />
        if (this.state.loading) return null
        const { post } = this.state.data
        return (
            <div>
                <div
                    style={{
                        position: 'fixed',
                        right: '50%',
                        marginRight: '-550px',
                        border: 'solid 1px lightgrey',
                        backgroundColor: '#faf9f5',
                        width: 100
                    }}
                >
                    <UserConsumer>
                        { ({ user }) => {
                            return user && user.role === 'writer' && (
                                <div>
                                    <div style={{ textAlign: 'center', color: 'lightgrey', margin: '20px 0' }}>
                                        <Link to={`/posts/${post.id}/edit`}>
                                            Edit
                                        </Link>
                                    </div>
                                    <div style={{ textAlign: 'center', color: 'lightgrey', margin: '20px 0' }}>
                                        <a onClick={() => this.open()} style={{ color: 'red' }}>
                                            Delete
                                        </a>
                                    </div>
                                </div>
                            )
                        }}
                    </UserConsumer>
                </div>
                <Header as='h1' style={{ fontSize: 36 }}>{post.title}</Header>
                <div style={{ margin: 5 }}>
                    <span style={{ fontSize: 13, color: 'grey' }}>
                        <span>
                            { post.views } views
                        </span>
                        <span style={{ marginLeft: 10 }}>
                            { post.created_time_ago }
                        </span>
                    </span>
                </div>
                <div>
                    {
                        post.tags.map(tag => <Tag key={tag.id} label={tag.name} color={tag.color}/>)
                    }
                </div>
                <div style={{ marginTop: 10 }}>
                    <Image src={post.image_url} fluid/>
                </div>
                <div style={{ margin: '30px 0', minHeight: 250 }}>
                    <ReactMarkdown
                        source={post.content}
                        renderers={{ code: CodeBlock }}
                    />
                </div>
                <Comments postId={post.id}/>
                <Modal size={'mini'} open={this.state.modal.open} onClose={this.close} centered={false}>
                    <Modal.Header>Delete Post</Modal.Header>
                    <Modal.Content>
                        <p>Are you sure you want to delete this post?</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={this.close}>No</Button>
                        <Button positive icon='checkmark' labelPosition='right' content='Yes' onClick={() => this.delete()}/>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

export default Show