import React from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
import { Grid, Icon, Modal, Button, Pagination } from 'semantic-ui-react'

class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            errors: {},
            loading: true,
            modal: {
                id: '',
                open: false
            }
        }
    }

    componentDidMount() {
        this.fetch()
    }

    fetch = (page) => {
        this.setState({ loading: true })
        axios({
            method: 'get',
            url: '/api/v1/posts',
            params: { page: page }
        }).then(response => {
            const { data } = response.data
            this.setState({ data, loading: false })
        }).catch(error => {
            const { errors } = error.response.data
            this.setState({ errors, loading: false })
        })
    };

    delete = (id) => {
        this.setState({ loading: true })
        axios({
            method: 'delete',
            url: `/api/v1/posts/${id}`
        }).then(response => {
            const { data } = response.data
            this.setState({ data, loading: false, modal: { id: '', open: false } })
        }).catch(error => {
            const { errors } = error.response.data
            this.setState({ errors, loading: false })
        })
    };

    open = (id) => {
        this.setState({ modal: { id, open: true } })
    };

    close = () => {
        this.setState({ modal: { open: false } })
    };

    pageChange = (_event, data) => {
        const { activePage } = data
        this.fetch(activePage)
    };

    render() {
        const { data, loading, modal } = this.state
        if (loading) return null
        return (
            <div>
                <Grid padded>
                    {
                        data.posts.map(post => {
                            return (
                                <Grid.Row key={ post.id }>
                                    <Grid.Column width={12}>
                                        <Link style={{ color: 'black' }} to={`/posts/${post.id}`}>{ post.title }</Link>
                                    </Grid.Column>
                                    <Grid.Column width={2}>
                                        <div style={{ fontSize: 12 }}>{ post.updated_time_ago }</div>
                                    </Grid.Column>
                                    <Grid.Column width={2}>
                                        {
                                            data.policy.edit && (
                                                <div>
                                                    <Link to={`/posts/${post.id}/edit`}>
                                                        <Icon name='edit outline'/>
                                                    </Link>
                                                    <a href="javascript:" onClick={() => this.open(post.id)}>
                                                        <Icon name='remove'/>
                                                    </a>
                                                </div>
                                            )
                                        }
                                    </Grid.Column>
                                </Grid.Row>
                            )
                        })
                    }
                    <Grid.Row>
                        <Grid.Column width={14}>
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
                        </Grid.Column>
                        <Grid.Column width={2}>
                            {
                                data.policy.new && (
                                    <Link to={'/posts/new'}>
                                        <Icon name='add'/>
                                        new
                                    </Link>
                                )
                            }
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Modal size={'mini'} open={modal.open} onClose={this.close} centered={false}>
                    <Modal.Header>Delete Post</Modal.Header>
                    <Modal.Content>
                        <p>Are you sure you want to delete this post?</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={this.close}>No</Button>
                        <Button positive icon='checkmark' labelPosition='right' content='Yes' onClick={() => this.delete(modal.id)}/>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

export default withRouter(Index)
