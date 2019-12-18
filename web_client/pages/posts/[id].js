import React, {useState, useEffect, useContext} from 'react'
import {Header, Modal, Button, Image} from 'semantic-ui-react'
import ReactMarkdown from 'react-markdown'
import UserContext from 'contexts/user_context'
import Tag from 'components/tag'
import CodeBlock from 'components/code_block'
import Comments from 'components/comments'
import {useDestroy} from 'hooks/post'
import FloatMenu from 'components/float_menu'
import AppLayout from 'layouts/app'
import Link from 'next/link'
import Post from 'models/post'
import WithError from 'components/with_error'

const Show = (props) => {
    const {post} = props.data
    const {user} = useContext(UserContext)
    const [_destroyState, destroy] = useDestroy(post.id)
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <AppLayout>
            {
                user && user.role === 'writer' && (
                    <FloatMenu>
                        <FloatMenu.Item>
                            <Link href={`/posts/[id]/edit`} as={`/posts/${post.id}/edit`}>
                                <a>Edit</a>
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
            }
            <Header as='h1' style={{ fontSize: 36 }}>{post.title}</Header>
            <div style={{ margin: 5 }}>
                <span style={{ fontSize: 13, color: 'grey' }}>
                    <span>
                        {post.views} views
                    </span>
                    <span style={{ marginLeft: 10 }}>
                        {post.created_time_ago}
                    </span>
                </span>
            </div>
            <div>
                {post.tags.map(tag => <Tag key={tag.id} label={tag.name} color={tag.color}/>)}
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
        </AppLayout>
    )
}

Show.getInitialProps = async function(context) {
    const {id} = context.query
    Post.setCookies(context)
    return await Post.resolved.find({id})
}

export default WithError(Show)
