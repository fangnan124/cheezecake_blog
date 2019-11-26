import React, {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import {Modal} from 'semantic-ui-react'
import _Form from './_Form'
import {useFetch, useUpdate} from 'components/posts/hooks'
import {UserConsumer} from 'components/contexts/UserContext'
import FloatMenu from 'components/FloatMenu'
import PostRevisions from 'components/post_revisions/Index'

const Edit = (props) => {
    const [fetchState, fetch] = useFetch(props.match.params.id)
    const [updateState, update] = useUpdate(props.match.params.id)
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => fetch(), [])

    if (updateState.redirect) return <Redirect to={{ pathname: '/posts' }} />
    if (fetchState.loading) return null
    return (
        <div>
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
                                        <PostRevisions postId={props.match.params.id}/>
                                    </Modal.Content>
                                </Modal>
                            </FloatMenu.Item>
                        </FloatMenu>
                    )
                } }
            </UserConsumer>
            <_Form submit={update} post={fetchState.data.post} errors={fetchState.errors} />
        </div>
    )
}

export default Edit