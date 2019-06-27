import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import UserContext from '../contexts/UserContext'
import { Modal } from 'semantic-ui-react'
import New from 'components/admin/invitation_requests/New'
import FormValidationMessage from 'components/FormValidationMessage'

class SignUp extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props)

        let email = localStorage.getItem('user.email')

        this.state = {
            email: email,
            password: '',
            name: '',
            invitation_code: '',
            redirect: false,
            errors: {}
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()

        this.setState({ loading: true })
        axios({
            method: 'post',
            url: '/auth',
            data: {
                email: this.state.email,
                password: this.state.password,
                name: this.state.name,
                invitation_code: this.state.invitation_code
            }
        }).then(response => {
            localStorage.setItem('access-token', response.headers['access-token'])
            localStorage.setItem('client', response.headers['client'])
            localStorage.setItem('uid', response.headers['uid'])

            this.context.setUser(response.data.data)
            this.setState({ redirect: true })
        }).catch(error => {
            const { errors } = error.response.data
            this.setState({ errors, loading: false })
        })
    };

    pathname = () => {
        const { location } = this.props
        if (location.state !== undefined) {
            return location.state.from.pathname
        } else {
            return '/'
        }
    };

    render() {
        if (this.state.redirect) return <Redirect to={{ pathname: this.pathname() }} />


        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                    <label>Email</label>
                    <input
                        type="text"
                        value={this.state.email}
                        onChange={e => this.setState({ email: e.target.value })}
                    />
                    <FormValidationMessage errors={this.state.errors} property={'email'}/>
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input
                        type="password"
                        value={this.state.password}
                        onChange={e => this.setState({ password: e.target.value })}
                    />
                    <FormValidationMessage errors={this.state.errors} property={'password'}/>
                </Form.Field>
                <Form.Field>
                    <label>Name</label>
                    <input
                        type="text"
                        value={this.state.name}
                        onChange={e => this.setState({ name: e.target.value })}
                    />
                    <FormValidationMessage errors={this.state.errors} property={'name'}/>
                </Form.Field>
                <Form.Field>
                    <label>Invitation Code</label>
                    <input
                        type="text"
                        value={this.state.invitation_code}
                        onChange={e => this.setState({ invitation_code: e.target.value })}
                    />
                    <FormValidationMessage errors={this.state.errors} property={'invitation_code'}/>
                    <div style={{ fontSize: 12, marginTop: 3 }}>
                        Don&#39;t have an invitation code?
                        <Modal trigger={<span style={{ marginLeft: 5, fontWeight: 'bold', cursor: 'pointer' }}>request</span>} size={'tiny'} style={{ display: 'inline' }}>
                            <Modal.Header>Request an invitation code</Modal.Header>
                            <Modal.Content>
                                <New/>
                            </Modal.Content>
                        </Modal>
                    </div>
                </Form.Field>
                <Button type='submit'>Sign Up</Button>
            </Form>
        )
    }
}

export default SignUp