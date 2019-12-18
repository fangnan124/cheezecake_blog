import {Form} from "semantic-ui-react"
import {useState} from "react"
import CommentModel from "models/comment";

const New = ({ postId, onSuccess }) => {
    const [text, setText] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()

        CommentModel
            .create({postId, params: { text }})
            .then(() => {
                onSuccess()
                setText('')
            })
    }

    return (
        <Form reply onSubmit={handleSubmit}>
            <Form.TextArea
                label='Leave a comment'
                value={text}
                onChange={(e, {value}) => setText(value)}
                style={{ height: '6em' }} // default is 12em, rows does not work here.
                // error={errorMessage({ errors: createState.errors, property: 'text' })}
            />
            {/*<FormValidationMessage errors={createState.errors} property={'text'}/>*/}
            <Form.Button content='Reply' labelPosition='left' icon='edit' primary/>
        </Form>
    )
}

export default New
