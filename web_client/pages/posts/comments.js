import React, {useState, useEffect} from 'react'
import {Header, Button, Comment, Form} from 'semantic-ui-react'
import axios from 'axios'
import FormValidationMessage from 'components/form_validation_message'

const Comments = ({ postId }) => {
    const [text, setText] = useState('')
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [editId, setEditId] = useState(null)
    const [editText, setEditText] = useState('')
    const [errors, setErrors] = useState({})

    useEffect(() => {
        setLoading(true)
        axios({
            method: 'get',
            url: `${process.env.api_prefix}/posts/${postId}/comments`,
            // params: { page: page }
        }).then(response => {
            const { data } = response.data
            setData(data)
        }).catch(error => {
            const { errors } = error.response.data
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    const create = (event) => {
        event.preventDefault()
        axios({
            method: 'post',
            url: `${process.env.api_prefix}/posts/${postId}/comments`,
            data: { text }
        }).then(response => {
            const { data } = response.data
            setData(data)
            clear()
        }).catch(error => {
            const { errors } = error.response.data
        })
    }

    const update = (event) => {
        event.preventDefault()
        axios({
            method: 'put',
            url: `${process.env.api_prefix}/comments/${editId}`,
            data: { text: editText }
        }).then(response => {
            const { data } = response.data
            setData(data)
            clearEdit()
        }).catch(error => {
            const { errors } = error.response.data
        })
    }

    const destroy = (id) => {
        axios({
            method: 'delete',
            url: `${process.env.api_prefix}/comments/${id}`
        }).then(response => {
            const { data } = response.data
            setData(data)
        }).catch(error => {
            const { errors } = error.response.data
        })
    }

    const clear = () => {
        setText('')
        setErrors({})
    }

    const clearEdit = () => {
        setEditId(null)
        setEditText('')
    }

    if (loading) return null
    return (
        <Comment.Group>
            <Header as='h3' dividing>
                Comments
            </Header>

            {
                data.comments.map((comment) => (
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
                                    <Form reply onSubmit={update}>
                                        <Form.TextArea
                                            onChange={(e, {value}) => setEditText(value)}
                                            defaultValue={comment.text}
                                            style={{ height: '6em' }} // default is 12em, rows does not work here.
                                        />
                                        <Button content='Update' labelPosition='left' icon='edit' primary/>
                                        <Button content='Cancel' labelPosition='left' icon='close' type='button' onClick={() => { setEditId(null); setEditText('') }}/>
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
                                                    <Comment.Action onClick={() => destroy(comment.id)}>
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
                data.comments.length <= 0 && (
                    <div>
                        No Comments
                    </div>
                )
            }

            {
                data.policy.create && (
                    <Form reply onSubmit={create}>
                        <Form.TextArea
                            label='Leave a comment'
                            value={text}
                            onChange={(e, {value}) => setText(value)}
                            style={{ height: '6em' }} // default is 12em, rows does not work here.
                        />
                        <FormValidationMessage errors={errors} property={'text'}/>
                        <Form.Button content='Reply' labelPosition='left' icon='edit' primary/>
                    </Form>
                )
            }
        </Comment.Group>
    )
}

export default Comments
