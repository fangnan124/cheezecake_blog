import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import {Grid, Pagination, Item, Label} from 'semantic-ui-react'
import {useFetchAll} from './hooks'

const Index = () => {
    const [data, fetchAll, loading, _errors] = useFetchAll()
    const [page, setPage] = useState(1)

    useEffect(() => fetchAll(page), [page])

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
