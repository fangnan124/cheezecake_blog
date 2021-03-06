import React, { useState, useEffect } from 'react'
import {Redirect, Link} from 'react-router-dom'
import {Header, Modal, Button, Image} from 'semantic-ui-react'
import ReactMarkdown from 'react-markdown'
import {UserConsumer} from 'components/contexts/UserContext'
import Tag from 'components/Tag'
import CodeBlock from 'components/CodeBlock'
import Comments from './Comments'
import {useFetch, useDestroy} from 'components/posts/hooks'
import FloatMenu from 'components/FloatMenu'

const Show = (props) => {
    const [fetchState, fetch] = useFetch(props.match.params.id)
    const [destroyState, destroy] = useDestroy(props.match.params.id)
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        fetch()
        gtag('config', 'UA-142403750-1', {'page_path': props.location.pathname})
    }, [])

    if (destroyState.redirect) return <Redirect to={{ pathname: '/posts' }}/>
    if (fetchState.loading) return null
    const { post } = fetchState.data
    return (
        <div>
            <UserConsumer>
                { ({ user }) => {
                    return user && user.role === 'writer' && (
                        <FloatMenu>
                            <FloatMenu.Item>
                                <Link to={`/posts/${post.id}/edit`}>
                                    Edit
                                </Link>
                            </FloatMenu.Item>
                            <FloatMenu.Item>
                                <a onClick={() => setModalOpen(true)} style={{ color: 'red' }}>
                                    Delete
                                </a>
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
                            </FloatMenu.Item>
                        </FloatMenu>
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
                    escapeHtml={false}
                />
            </div>
            <Comments postId={post.id}/>
        </div>
    )
}

export default Show