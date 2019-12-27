import {Pagination, Item, Label} from 'semantic-ui-react'
import AppLayout from 'layouts/app_layout'
import Link from 'next/link'
import PostModel from 'models/post_model'
import Router from 'next/router'

const Index = (props) => {
    const { posts, currentPage, totalPages } = props.data

    return (
        <AppLayout>
            <Item.Group divided>
                {
                    posts.map(post => (
                        <Item key={post.id}>
                            <Item.Image src={post.thumb_url}/>
                            <Item.Content>
                                <Item.Header>
                                    <Link href={'/posts/[id]'} as={`/posts/${post.id}`}>
                                        <a>{post.title}</a>
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
                defaultActivePage={currentPage}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                siblingRange={3}
                totalPages={totalPages}
                onPageChange={(_, data) => Router.push(`/posts?page=${data.activePage}`)}
            />
        </AppLayout>
    )
}

Index.getInitialProps = async function(context) {
    const { page } = context.query
    PostModel.setCookies(context)
    return await PostModel.resolved.all({ page })
}

export default Index
