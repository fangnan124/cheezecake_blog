import React, {useState} from 'react'
import {Modal} from 'semantic-ui-react'
import _Form from '../_form'
import FloatMenu from 'components/float_menu'
import PostRevisions from 'pages/post_revisions/'
import AppLayout from 'layouts/app'
import Post from 'models/post'
import WithError from 'components/with_error'
import Router from "next/router";

const Edit = (props) => {
    const {post} = props.data
    const [errors, setErrors] = useState([])
    const [modalOpen, setModalOpen] = useState(false)

    const handleSubmit = (params) => {
        Post.update({id: post.id, params})
            .then(() => Router.push('/posts'))
            .catch(error => setErrors(error.response.data.errors))
    }

    return (
        <AppLayout>
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
            <_Form submit={handleSubmit} post={post} errors={errors} />
        </AppLayout>
    )
}

Edit.getInitialProps = async function(context) {
    const { id } = context.query
    Post.setCookies(context)
    return await Post.resolved.find({ id })
};

export default WithError(Edit)