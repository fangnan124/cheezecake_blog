import React, {useState, useEffect} from 'react'
import {Pagination, Item, Label} from 'semantic-ui-react'
import {useFetchAll} from './hooks'
import AppLayout from 'layouts/app'
import Link from 'next/link'

const Index = (props) => {
    const [fetchAllState, fetchAll] = useFetchAll()
    const [page, setPage] = useState(1)

    useEffect(() => {
        fetchAll(page)
        // gtag('config', 'UA-142403750-1', {'page_path': props.location.pathname})
    }, [page])

    console.log(fetchAllState)

    if (fetchAllState.loading) return null
    return (
        <AppLayout>
            <Item.Group divided>
                {
                    fetchAllState.data.posts.map(post => (
                        <Item key={post.id}>
                            <Item.Image src={post.thumb_url}/>
                            <Item.Content>
                                <Item.Header>
                                    <Link href="/posts/[id]" as={`/posts/${post.id}`}>
                                        {post.title}
                                    </Link>
                                </Item.Header>
                                <Item.Meta style={{fontSize: 13}}>
                                    <span className='cinema'>{post.updated_time_ago}</span>
                                </Item.Meta>
                                <Item.Description style={{opacity: 0.6, fontSize: 14}}>
                                    {post.description}
                                </Item.Description>
                                <Item.Extra style={{opacity: 0.8}}>
                                    {
                                        post.tags.map(tag => (
                                            <Label key={tag.id} style={{fontSize: 12, padding: '3px 6px'}}>
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
        </AppLayout>
    )
}

export default Index
