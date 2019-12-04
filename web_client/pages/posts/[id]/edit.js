import React, {useState, useEffect} from 'react'
import {Modal} from 'semantic-ui-react'
import _Form from '../_form'
import {useFetch, useUpdate} from 'models/post'
import {UserConsumer} from 'contexts/user_context'
import FloatMenu from 'components/float_menu'
import PostRevisions from 'pages/post_revisions/'
import AppLayout from 'layouts/app'
import Posts from "../../../models/posts";
import Post from "../[id]";
import Error from "next/error";

const Edit = (props) => {
    if (props.meta.status !== '200') {
        return <Error statusCode={props.meta.status} />
    }

    const { post } = props.data
    const [updateState, update] = useUpdate(post.id)
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <AppLayout>
            <UserConsumer>
                { ({ user }) => {
                    return user && user.role === 'writer' && (
                        <FloatMenu>
                            <FloatMenu.Item>
                                <a onClick={() => setModalOpen(true)}>
                                    Revisions
                                </a>
                                <Modal size={'small'} open={modalOpen} onClose={() => setModalOpen(false)}>
                                    <Modal.Header>Revisions</Modal.Header>
                                    <Modal.Content style={{padding: 0}}>
                                        <PostRevisions postId={id}/>
                                    </Modal.Content>
                                </Modal>
                            </FloatMenu.Item>
                        </FloatMenu>
                    )
                } }
            </UserConsumer>
            <_Form submit={update} post={post} errors={errors} />
        </AppLayout>
    )
}

Post.getInitialProps = async function(context) {
    const { id } = context.query
    Posts.setCookies(context)
    return await Posts.find({ id })
};

export default Edit