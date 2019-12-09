import React, {useState, useEffect, useContext} from 'react'
import {Modal} from 'semantic-ui-react'
import _Form from '../_form'
import {useFetch, useUpdate} from 'hooks/post'
import UserContext, {UserConsumer} from 'contexts/user_context'
import FloatMenu from 'components/float_menu'
import PostRevisions from 'pages/post_revisions/'
import AppLayout from 'layouts/app'
import Post from "models/post";
import Error from "next/error";
import WithError from 'components/with_error'

const Edit = (props) => {
    const { post } = props.data
    const { user, setUser } = useContext(UserContext)
    const [updateState, update] = useUpdate(post.id)
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <AppLayout>
            {
                user && user.role === 'writer' && (
                    <FloatMenu>
                        <FloatMenu.Item>
                            <a onClick={() => setModalOpen(true)}>
                                Revisions
                            </a>
                            <Modal size={'small'} open={modalOpen} onClose={() => setModalOpen(false)}>
                                <Modal.Header>Revisions</Modal.Header>
                                <Modal.Content style={{padding: 0}}>
                                    <PostRevisions postId={post.id}/>
                                </Modal.Content>
                            </Modal>
                        </FloatMenu.Item>
                    </FloatMenu>
                )
            }
            <_Form submit={update} post={post} errors={props.errors} />
        </AppLayout>
    )
}

Edit.getInitialProps = async function(context) {
    const { id } = context.query
    Post.setCookies(context)
    return await Post.resolved.find({ id })
};

export default WithError(Edit)