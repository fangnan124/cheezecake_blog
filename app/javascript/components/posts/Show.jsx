import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Redirect, Link} from 'react-router-dom'
import {Header, Modal, Button, Image} from 'semantic-ui-react'
import ReactMarkdown from 'react-markdown'
import {UserConsumer} from 'components/contexts/UserContext'
import Tag from 'components/Tag'
import CodeBlock from 'components/CodeBlock'
import Comments from './Comments'
import {useFetch, useDestroy} from 'components/posts/hooks'

const Show = (props) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [data, fetch, loading, fetchErrors] = useFetch(props.match.params.id)
    const [destroy, redirect, destroyErrors] = useDestroy(props.match.params.id)

    useEffect(() => fetch(), [])

    if (redirect) return <Redirect to={{ pathname: '/posts' }}/>
    if (loading) return null
    const { post } = data
    return (
        <div>
            <UserConsumer>
                { ({ user }) => {
                    return user && user.role === 'writer' && (
                        <div style={{
                            position: 'fixed',
                            right: '50%',
                            marginRight: '-550px',
                            border: 'solid 1px lightgrey',
                            backgroundColor: '#faf9f5',
                            width: 100
                        }}>
                            <div style={{ textAlign: 'center', color: 'lightgrey', margin: '20px 0' }}>
                                <Link to={`/posts/${post.id}/edit`}>
                                    Edit
                                </Link>
                            </div>
                            <div style={{ textAlign: 'center', color: 'lightgrey', margin: '20px 0' }}>
                                <a onClick={() => setModalOpen(true)} style={{ color: 'red' }}>
                                    Delete
                                </a>
                            </div>
                        </div>
                    )
                }}
            </UserConsumer>
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
                <div style={{
                    textAlign: 'center',
                    opacity: 0.6,
                    fontSize: 14,
                    marginTop: 8
                }}>
                    <div dangerouslySetInnerHTML={{__html: post.image_description}} />
                </div>
            </div>
            <div style={{ margin: '30px 0', minHeight: 250 }}>
                <ReactMarkdown
                    source={post.content}
                    renderers={{ code: CodeBlock }}
                />
            </div>
            <Comments postId={post.id}/>
            <Modal size={'mini'} open={modalOpen} onClose={() => setModalOpen(false)} centered={false}>
                <Modal.Header>Delete Post</Modal.Header>
                <Modal.Content>
                    <p>Are you sure you want to delete this post?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={() => setModalOpen(false)}>No</Button>
                    <Button positive icon='checkmark' labelPosition='right' content='Yes' onClick={() => destroy()}/>
                </Modal.Actions>
            </Modal>
        </div>
    )
}

export default Show