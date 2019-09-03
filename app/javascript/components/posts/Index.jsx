import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
import {Grid, Pagination, Item, Label} from 'semantic-ui-react'

const Index = () => {
    const [data, setData] = useState({})
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)

    useEffect(() => {
        setLoading(true)
        axios({
            method: 'get',
            url: '/api/v1/posts',
            params: { page: page }
        }).then(response => {
            const { data } = response.data
            setData(data)
            setLoading(false)
        }).catch(error => {
            const { errors } = error.response.data
            setErrors(errors)
            setLoading(false)
        })
    }, [page])

    if (loading) return null
    return (
        <Grid padded>
            <Item.Group divided>
                {
                    data.posts.map(post => (
                        <Item key={post.id}>
                            <Item.Image src={post.thumb_url}/>
                            <Item.Content>
                                <Item.Header>
                                    <Link to={`/posts/${post.id}`}>{post.title}</Link>
                                </Item.Header>
                                <Item.Meta style={{fontSize: 13}}>
                                    <span className='cinema'>{post.updated_time_ago}</span>
                                    {/* Views and Comments are hidden for minimal */}
                                    {/*<span className='cinema m-l-5'>*/}
                                    {/*    <Icon name='eye'/> {post.views}*/}
                                    {/*</span>*/}
                                    {/*<span className='cinema m-l-5'>*/}
                                    {/*    <Icon name='comment alternate outline'/> {post.comments_count}*/}
                                    {/*</span>*/}
                                </Item.Meta>
                                <Item.Description style={{opacity: 0.6, fontSize: 14}}>
                                    {post.description}
                                </Item.Description>
                                <Item.Extra style={{opacity: 0.8}}>
                                    {
                                        post.tags.map(tag => (
                                            <Label key={tag.id} style={{fontSize: 12, padding: '3px 6px'}} >
                                                {tag.name}
                                            </Label>
                                        ))
                                    }
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    ))
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
                        onPageChange={(_, data) => setPage(data.activePage)}
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default withRouter(Index)
