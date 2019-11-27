import React from 'react'
import axios from 'axios'
import { Table, Pagination } from 'semantic-ui-react'
import { Dropdown } from 'semantic-ui-react'

class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            errors: {},
            loading: true
        }
    }

    componentDidMount() {
        this.fetch()
    }

    fetch = (page) => {
        this.setState({ loading: true })
        axios({
            method: 'get',
            url: '/api/v1/invitation_requests',
            params: { page: page }
        }).then(response => {
            const { data } = response.data
            this.setState({ data, loading: false })
        }).catch(error => {
            const { errors } = error.response.data
            this.setState({ errors, loading: false })
        })
    };

    approve = (id) => {
        axios({
            method: 'put',
            url: `/api/v1/invitation_requests/${id}/approve`
        }).then(response => {
            const { data: approved } = response.data
            const data = Object.assign({}, this.state.data)

            data.invitation_requests = data.invitation_requests.map(request => {
                if (request.id === id) {
                    request = approved.invitation_request
                }
                return request
            })

            this.setState({ data, loading: false })
        }).catch(error => {
            const { errors } = error.response.data
            this.setState({ errors, loading: false })
        })
    }

    pageChange = (_event, data) => {
        const { activePage } = data
        this.fetch(activePage)
    };

    render() {
        const { data, loading } = this.state
        if (loading) return null
        return (
            <Table celled compact>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Message</Table.HeaderCell>
                        <Table.HeaderCell>Code</Table.HeaderCell>
                        <Table.HeaderCell>Expire At</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        data.invitation_requests.map(request => (
                            <Table.Row key={request.id}>
                                <Table.Cell>{ request.email }</Table.Cell>
                                <Table.Cell>{ request.message }</Table.Cell>
                                <Table.Cell>{ request.code }</Table.Cell>
                                <Table.Cell>{ request.expire_at }</Table.Cell>
                                <Table.Cell>
                                    <Dropdown text={ request.status }>
                                        <Dropdown.Menu>
                                            <Dropdown.Item text='Approve' onClick={() => this.approve(request.id)}/>
                                            <Dropdown.Item text='Pending'/>
                                            <Dropdown.Item text='Decline'/>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>

                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='5'>
                            <Pagination
                                boundaryRange={0}
                                defaultActivePage={data.currentPage}
                                ellipsisItem={null}
                                firstItem={null}
                                lastItem={null}
                                siblingRange={1}
                                totalPages={data.totalPages}
                                onPageChange={this.pageChange}
                                pointing
                                secondary
                            />
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        )
    }
}

export default Index
