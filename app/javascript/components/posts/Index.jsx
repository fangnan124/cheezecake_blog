import React from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
import { Grid, Pagination, Item, Label } from 'semantic-ui-react'
import Tag from "components/Tag";

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

    pageChange = (_event, data) => {
        const { activePage } = data
        this.fetch(activePage)
    };

    render() {
        const { data, loading } = this.state
        if (loading) return null
        return (
            <div>
                <Grid padded>
                    <Item.Group divided>
                        {
                            data.posts.map(post => {
                                return (
                                    <Item key={ post.id }>
                                        <Item.Image src={ post.image_url } />
                                        <Item.Content>
                                            <Item.Header>
                                                <Link to={`/posts/${post.id}`}>{ post.title }</Link>
                                            </Item.Header>
                                            <Item.Meta style={{ fontSize: 13 }}>
                                                <span className='cinema'>{ post.updated_time_ago }</span>
                                                <span className='cinema' style={{ marginLeft: 5 }}>{ post.views } views</span>
                                                <span className='cinema' style={{ marginLeft: 5 }}>{ post.comments_count } comments</span>
                                            </Item.Meta>
                                            <Item.Description style={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: 14 }}>
                                                { post.description }
                                            </Item.Description>
                                            {/*<Item.Extra>*/}
                                            {/*    <Label>IMAX</Label>*/}
                                            {/*    <Label icon='globe' content='Additional Languages' />*/}
                                            {/*</Item.Extra>*/}
                                            <Item.Extra style={{ opacity: 0.8 }}>
                                                {
                                                    post.tags.map(tag => <Label style={{ fontSize: 12, padding: '4px 8px' }}>{tag.name}</Label>)
                                                }
                                            </Item.Extra>
                                        </Item.Content>
                                    </Item>
                                )
                            })
                        }
                    </Item.Group>
                    <Grid.Row>
                        <Grid.Column>
                            <Pagination
                                boundaryRange={0}
                                defaultActivePage={data.currentPage}
                                ellipsisItem={null}
                                firstItem={null}
                                lastItem={null}
                                siblingRange={3}
                                totalPages={data.totalPages}
                                onPageChange={this.pageChange}
                                pointing
                                secondary
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default withRouter(Index)
