import React, {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import {Header, Modal, Icon, Menu, Table, Pagination, Form} from 'semantic-ui-react'
import _Form from './_Form'
import {useFetch, useUpdate} from 'components/posts/hooks'
import {useFetchAll} from 'components/post_revisions/hooks'
import {UserConsumer} from "../contexts/UserContext";

const RevisionNumber = (props) => {
    const [modalOpen, setModalOpen] = useState(false)
    return (
        <div>
            <div onClick={() => setModalOpen(true)}>
                {props.post_revision.revision_number}
            </div>
            <Modal size={'small'} open={modalOpen} onClose={() => setModalOpen(false)}>
                <Modal.Header>Revisions</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <Form.TextArea
                                defaultValue={props.post_revision.content}
                                style={{ height: 500 }}
                            />
                        </Form.Field>
                    </Form>
                </Modal.Content>
            </Modal>
        </div>
    )
}

const Edit = (props) => {
    const [fetchState, fetch] = useFetch(props.match.params.id)
    const [updateState, update] = useUpdate(props.match.params.id)
    const [fetchAllState, fetchAll] = useFetchAll(props.match.params.id)
    const [page, setPage] = useState(1)
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => fetch(), [])
    useEffect(() => fetchAll(page), [page])

    if (updateState.redirect) return <Redirect to={{ pathname: '/posts' }} />
    if (fetchState.loading) return null
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
                                <a onClick={() => setModalOpen(true)}>
                                    Revisions
                                </a>
                            </div>
                            <Modal size={'small'} open={modalOpen} onClose={() => setModalOpen(false)}>
                                <Modal.Header>Revisions</Modal.Header>
                                <Modal.Content>
                                    <Table celled>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>Revision Number</Table.HeaderCell>
                                                <Table.HeaderCell>Created Time</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>

                                        <Table.Body>
                                            {
                                                fetchAllState.data.post_revisions.map(post_revision => (
                                                    <Table.Row>
                                                        <Table.Cell>
                                                            <RevisionNumber post_revision={post_revision}/>
                                                        </Table.Cell>
                                                        <Table.Cell>{post_revision.created_time_ago}</Table.Cell>
                                                    </Table.Row>
                                                ))
                                            }
                                        </Table.Body>

                                        <Table.Footer>
                                            <Table.Row>
                                                <Table.HeaderCell colSpan='3'>
                                                    <Pagination
                                                        boundaryRange={0}
                                                        defaultActivePage={fetchAllState.data.currentPage}
                                                        ellipsisItem={null}
                                                        firstItem={null}
                                                        lastItem={null}
                                                        siblingRange={3}
                                                        totalPages={fetchAllState.data.totalPages}
                                                        onPageChange={(_, data) => setPage(data.activePage)}
                                                    />
                                                </Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Footer>
                                    </Table>
                                </Modal.Content>
                            </Modal>
                        </div>
                    )
                }}
            </UserConsumer>
            <_Form submit={update} post={fetchState.data.post} errors={fetchState.errors} />
        </div>
    )
}

export default Edit