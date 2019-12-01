import React, {useState, useEffect} from 'react'
import {Header, Modal, Button, Image} from 'semantic-ui-react'
import ReactMarkdown from 'react-markdown'
import {UserConsumer} from 'contexts/user_context'
import Tag from 'components/tag'
import CodeBlock from 'components/code_block'
import Comments from './comments'
import {useFetch, useDestroy} from 'models/post'
import FloatMenu from 'components/float_menu'
import {useRouter} from 'next/router'
import AppLayout from 'layouts/app'
import Link from 'next/link'
import axios from "axios";

const Post = (props) => {
    // const router = useRouter()
    // const { id } = router.query

    console.log(1234)
    console.log(props)

    // const [fetchState, fetch1] = useFetch(id)
    // const [destroyState, destroy] = useDestroy(id)
    const [modalOpen, setModalOpen] = useState(false)

    // useEffect(() => fetch1(), [])

    // if (fetchState.loading) return null
    const { post } = props.data
    return (
        <AppLayout>
            <UserConsumer>
                { ({ user }) => {
                    return user && user.role === 'writer' && (
                        <FloatMenu>
                            <FloatMenu.Item>
                                <Link href={`/posts/${post.id}/edit`}>
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
                                        {/*<Button positive icon='checkmark' labelPosition='right' content='Yes' onClick={() => destroy()}/>*/}
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
        </AppLayout>
    )
}

Post.getInitialProps = async function(context) {
    const { id } = context.query;

    console.log(id)

    let result = {
        data: {},
        errors: {}
    }

    await axios({
        method: 'get',
        url: `${process.env.api_prefix}/posts/${id}`
    }).then(response => {
        const { data } = response.data
        result.data = data
    }).catch(error => {

        console.log(error)

        // setHttpStatus(error.response.status)
        // const { errors } = error.response.data
        // result.errors = errors
    })

    return result;
};

export default Post