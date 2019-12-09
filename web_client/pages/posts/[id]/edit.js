import React, {useState, useContext} from 'react'
import {Modal} from 'semantic-ui-react'
import _Form from '../_form'
import {useUpdate} from 'hooks/post'
import UserContext from 'contexts/user_context'
import FloatMenu from 'components/float_menu'
import PostRevisions from 'pages/post_revisions/'
import AppLayout from 'layouts/app'
import Post from 'models/post'
import WithError from 'components/with_error'
import Router from "next/router";

const Edit = (props) => {
    const {post} = props.data
    const {user} = useContext(UserContext)
    const [errors, setErrors] = useState([])
    const [modalOpen, setModalOpen] = useState(false)

    const handleUpdate = (params) => {
        Post.update({ params })
            .then(response => {
                Router.push('/posts')
            }).catch(error => {
                const { errors } = error.response.data
                setErrors(errors)
            })
    }

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
            <_Form submit={handleUpdate} post={post} errors={errors} />
        </AppLayout>
    )
}

Edit.getInitialProps = async function(context) {
    const { id } = context.query
    Post.setCookies(context)
    return await Post.resolved.find({ id })
};

export default WithError(Edit)