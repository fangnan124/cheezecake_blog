import {useState, useEffect} from 'react'
import {Header, Button, Comment, Form} from 'semantic-ui-react'
import {useFetchAll, useCreate, useUpdate, useDestroy} from 'models/comment'
import FormValidationMessage from 'components/form_validation_message'
import { errorMessage } from 'helpers/form_helper'

const Comments = ({ postId }) => {
    const [text, setText] = useState('')
    const [editId, setEditId] = useState(null)
    const [editText, setEditText] = useState('')

    const [fetchAllState, fetchAll] = useFetchAll(postId)
    const [createState, create] = useCreate(postId)
    const [updateState, update] = useUpdate(editId)
    const [destroyState, destroy] = useDestroy()

    useEffect(() => {
        fetchAll()
    }, [])

    const handleCreate = (event) => {
        event.preventDefault()
        create({
            params: { text },
            onSuccess: () => fetchAll()
        })
    }

    const handleUpdate = (event) => {
        event.preventDefault()
        update({
            params: { text: editText },
            onSuccess: () => {
                fetchAll()
                clearEdit()
            }
        })
    }

    const handleDestroy = (id) => {
        destroy({
            id,
            onSuccess: () => {
                fetchAll()
                clear()
            }
        })
    }

    const clear = () => {
        setText('')
    }

    const clearEdit = () => {
        setEditId(null)
        setEditText('')
        updateState.setErrors({})
    }

    return (
        <Comment.Group>
            <Header as='h3' dividing>
                Comments1234
            </Header>

            {
                fetchAllState.data.comments.map((comment) => (
                    <Comment key={comment.id}>
                        <Comment.Avatar src={comment.user.avatar_url} className='ui circular image'/>
                        <Comment.Content>
                            <Comment.Author as='a'>
                                <span>
                                    {comment.user.name}
                                </span>
                            </Comment.Author>
                            <Comment.Metadata>
                                <span>{ comment.created_time_ago }</span>
                            </Comment.Metadata>
                            {
                                editId === comment.id ? (
                                    <Form reply onSubmit={handleUpdate}>
                                        <Form.TextArea
                                            onChange={(e, {value}) => setEditText(value)}
                                            defaultValue={comment.text}
                                            style={{ height: '6em' }} // default is 12em, rows does not work here.
                                            error={errorMessage({ errors: updateState.errors, property: 'text' })}
                                        />
                                        <Button content='Update' labelPosition='left' icon='edit' primary/>
                                        <Button content='Cancel' labelPosition='left' icon='close' type='button' onClick={() => clearEdit()}/>
                                    </Form>
                                ) : (
                                    <div>
                                        <Comment.Text style={{ whiteSpace: 'pre-wrap' }}>{ comment.text }</Comment.Text>
                                        <Comment.Actions>
                                            {
                                                comment.policy.edit && (
                                                    <Comment.Action onClick={() => setEditId(comment.id)}>
                                                        Edit
                                                    </Comment.Action>
                                                )
                                            }
                                            {
                                                comment.policy.delete && (
                                                    <Comment.Action onClick={() => handleDestroy(comment.id)}>
                                                        Delete
                                                    </Comment.Action>
                                                )
                                            }
                                        </Comment.Actions>
                                    </div>
                                )
                            }
                        </Comment.Content>
                    </Comment>
                ))
            }

            {
                fetchAllState.data.comments.length <= 0 && (
                    <div>
                        No Comments
                    </div>
                )
            }

            {
                fetchAllState.data.policy.create && (
                    <Form reply onSubmit={handleCreate}>
                        <Form.TextArea
                            label='Leave a comment'
                            value={text}
                            onChange={(e, {value}) => setText(value)}
                            style={{ height: '6em' }} // default is 12em, rows does not work here.
                            error={errorMessage({ errors: createState.errors, property: 'text' })}
                        />
                        {/*<FormValidationMessage errors={createState.errors} property={'text'}/>*/}
                        <Form.Button content='Reply' labelPosition='left' icon='edit' primary/>
                    </Form>
                )
            }
        </Comment.Group>
    )
}

export default Comments
