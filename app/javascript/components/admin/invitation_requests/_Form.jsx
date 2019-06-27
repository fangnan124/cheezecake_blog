import React from 'react'
import { Form } from 'semantic-ui-react'

class _Form extends React.Component {
    static defaultProps = {
        invitation_request: {
            email: '',
            message: ''
        }
    };

    constructor(props) {
        super(props)
        this.state = {
            email: props.invitation_request.email,
            message: props.invitation_request.message,
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.submit({
            email: this.state.email,
            message: this.state.message
        })
    };

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                    <label>Email</label>
                    <input
                        type="text"
                        value={this.state.email}
                        onChange={e => this.setState({ email: e.target.value })}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Message</label>
                    <textarea
                        value={this.state.message}
                        onChange={e => this.setState({ message: e.target.value })}
                    />
                </Form.Field>
                <Form.Button content='Save' labelPosition='left' icon='edit' primary/>
            </Form>
        )
    }
}

export default _Form