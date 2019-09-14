import React, {useState, useEffect} from 'react'
import {Pagination, Modal, Table, Form} from 'semantic-ui-react'
import {useFetchAll} from './hooks'

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

const Index = (props) => {
    const [fetchAllState, fetchAll] = useFetchAll(props.postId)
    const [page, setPage] = useState(1)

    useEffect(() => fetchAll(page), [page])

    if (fetchAllState.loading) return null
    return (
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
    )
}

export default (Index)