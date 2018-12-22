import React from 'react'
import { Button, Form, Checkbox } from 'semantic-ui-react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import UserContext from '../contexts/UserContext'

class Login extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props)

        let email = localStorage.getItem('user.email')
        let rememberMe
        if (email === undefined) {
            email = ''
            rememberMe = false
        } else {
            rememberMe = true
        }

        this.state = {
            email: email,
            password: '',
            rememberMe: rememberMe,
            redirect: false
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()

        this.setState({ loading: true })
        axios({
            method: 'post',
            url: '/auth/sign_in',
            data: {
                email: this.state.email,
                password: this.state.password
            }
        }).then(response => {
            localStorage.setItem('access-token', response.headers['access-token'])
            localStorage.setItem('client', response.headers['client'])
            localStorage.setItem('uid', response.headers['uid'])

            if (this.state.rememberMe) {
                localStorage.setItem('user.email', this.state.email)
            } else {
                localStorage.removeItem('user.email')
            }

            axios.defaults.headers.common['access-token'] = response.headers['access-token'];
            axios.defaults.headers.common['client'] = response.headers['client'];
            axios.defaults.headers.common['uid'] = response.headers['uid'];

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
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input
                        type="text"
                        value={this.state.password}
                        onChange={e => this.setState({ password: e.target.value })}
                    />
                </Form.Field>
                <Form.Field>
                    <Checkbox
                        label='remember me'
                        checked={this.state.rememberMe}
                        onChange={() => this.setState({ rememberMe: !this.state.rememberMe })}
                    />
                </Form.Field>
                <Button type='submit'>Login</Button>
            </Form>
        )
    }
}

export default Login