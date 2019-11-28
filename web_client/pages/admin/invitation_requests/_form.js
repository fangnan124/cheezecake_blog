import React, {useState} from 'react'
import { Form } from 'semantic-ui-react'

const _Form = (props) => {
    const [email, setEmail] = useState(props.invitation_request.email)
    const [message, setMessage] = useState(props.invitation_request.message)

    const submit = (event) => {
        event.preventDefault()
        props.submit({ email, message })
    }

    return (
        <Form onSubmit={submit}>
            <Form.Field>
                <label>Email</label>
                <input
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <label>Message</label>
                <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
            </Form.Field>
            <Form.Button content='Send' labelPosition='left' icon='send' primary/>
        </Form>
    )
}

_Form.defaultProps = {
    invitation_request: {
        email: '',
        message: ''
    }
}

export default _Form