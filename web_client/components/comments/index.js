import React, {useState, useEffect} from 'react'
import {Header, Comment} from 'semantic-ui-react'
import CommentModel from 'models/comment'
import New from './new'
import Show from './show'

const Index = ({ postId }) => {
    const [editing, setEditing] = useState(false)
    const [data, setData] = useState({ comments: [], policy: {} })

    useEffect(() => {
        fetchAll()
    }, [])

    const fetchAll = (page) => {
        CommentModel
            .all({postId, page})
            .then(response => {
                const {data} = response.data
                setData(data)
            })
    }

    return (
        <Comment.Group>
            <Header as='h3' dividing>Comments</Header>

            { // Body
                data.comments.length > 0
                    ? data.comments.map((comment) => (
                        <Comment key={comment.id}>
                            <Comment.Avatar src={comment.user.avatar_url} className='ui circular image'/>
                            <Comment.Content>
                                <Comment.Author as='a'>
                                <span>
                                    {comment.user.name}
                                </span>
                                </Comment.Author>
                                <Comment.Metadata>
                                    <span>{comment.created_time_ago}</span>
                                </Comment.Metadata>
                                <Show
                                    comment={comment}
                                    indexEditing={editing}
                                    setIndexEditing={setEditing}
                                    onSuccess={() => fetchAll()}
                                />
                            </Comment.Content>
                        </Comment>
                    ))
                    : <div>No Comments</div>
            }

            {
                data.policy.create && !editing && (
                    <New postId={postId} onSuccess={() => fetchAll()}/>
                )
            }
        </Comment.Group>
    )
}

export default Index
