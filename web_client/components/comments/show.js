import {Comment} from 'semantic-ui-react'
import {useState} from 'react'
import Edit from './edit'
import CommentModel from 'models/comment_model'

const Show = (props) => {
    const { comment, indexEditing, setIndexEditing, onSuccess } = props
    const [editing, setEditing] = useState(false)

    const handleDestroy = () => {
        CommentModel
            .destroy({ id: comment.id })
            .then(() => {
                onSuccess()
            })
    }

    return (
        editing
            ? <Edit setEditing={setEditing} {...props}/>
            : (
                <div>
                    <Comment.Text style={{whiteSpace: 'pre-wrap'}}>{comment.text}</Comment.Text>
                    {
                        indexEditing || (
                            <Comment.Actions>
                                {
                                    comment.policy.edit && (
                                        <Comment.Action onClick={() => {
                                            setEditing(true)
                                            setIndexEditing(true)
                                        }}>
                                            Edit
                                        </Comment.Action>
                                    )
                                }
                                {
                                    comment.policy.delete && (
                                        <Comment.Action onClick={handleDestroy}>
                                            Delete
                                        </Comment.Action>
                                    )
                                }
                            </Comment.Actions>
                        )
                    }
                </div>
            )
    )
}

export default Show
