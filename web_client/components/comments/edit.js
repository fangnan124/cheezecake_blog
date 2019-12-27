import {Button, Form} from 'semantic-ui-react'
import {useState} from 'react'
import CommentModel from 'models/comment_model'

const Edit = (props) => {
    const { comment, setEditing, setIndexEditing, onSuccess } = props
    const [text, setText] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        CommentModel
            .update({id: comment.id, params: { text }})
            .then(() => {
                onSuccess()
                setEditing(false)
                setIndexEditing(false)
                setText('')
            })
    }

    return (
        <Form reply onSubmit={handleSubmit}>
            <Form.TextArea
                onChange={(e, {value}) => setText(value)}
                defaultValue={comment.text}
                style={{ height: '6em' }} // default is 12em, rows does not work here.
                // error={errorMessage({ errors: updateState.errors, property: 'text' })}
            />
            <Button content='Update' labelPosition='left' icon='edit' primary/>
            <Button content='Cancel' labelPosition='left' icon='close' type='button' onClick={() => { setEditing(false); setIndexEditing(false) }}/>
        </Form>
    )
}

export default Edit
