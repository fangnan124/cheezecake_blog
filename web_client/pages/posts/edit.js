import React, {useState, useEffect} from 'react'
import {Modal} from 'semantic-ui-react'
import _Form from '../_form'
import {useFetch, useUpdate} from '../hooks'
import {UserConsumer} from 'contexts/UserContext'
import FloatMenu from 'components/float_menu'
// import PostRevisions from 'components/post_revisions/Index'
import AppLayout from 'layouts/app'
import { useRouter } from 'next/router'

const Edit = () => {
    const router = useRouter()
    const { id } = router.query

    const [fetchState, fetch] = useFetch(id)
    const [updateState, update] = useUpdate(id)
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => fetch(), [])

    if (fetchState.loading) return null
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
                                        {/*<PostRevisions postId={props.match.params.id}/>*/}
                                    </Modal.Content>
                                </Modal>
                            </FloatMenu.Item>
                        </FloatMenu>
                    )
                } }
            </UserConsumer>
            <_Form submit={update} post={fetchState.data.post} errors={fetchState.errors} />
        </AppLayout>
    )
}

export default Edit