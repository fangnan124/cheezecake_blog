import React, {useState, useEffect, useContext} from 'react'
import { Button, Form, Checkbox } from 'semantic-ui-react'
import axios from 'axios'
import UserContext from 'contexts/user_context'
import AppLayout from 'layouts/app'
import Router from 'next/router'
import { useCookies } from 'react-cookie';
import Auth from 'models/auth'

const Login = () => {
    const [cookies, setCookie] = useCookies(['access-token', 'client', 'uid']);
    const { setUser } = useContext(UserContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)

    useEffect(() => {
        let email = localStorage.getItem('user.email')
        let rememberMe
        if (email === undefined) {
            email = ''
            rememberMe = false
        } else {
            rememberMe = true
        }

        setEmail(email)
        setRememberMe(rememberMe)
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()

        Auth.sign_in({ email, password })
            .then(response => {
                setCookie('access-token', response.headers['access-token'])
                setCookie('client', response.headers['client'])
                setCookie('uid', response.headers['uid'])

                if (rememberMe) {
                    localStorage.setItem('user.email', email)
                } else {
                    localStorage.removeItem('user.email')
                }

                setUser(response.data.data.user)

                Router.push('/posts')
            }).catch(error => {
                const { errors } = error.response.data
            })
    }

    return (
        <AppLayout>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Email</label>
                    <input
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <Checkbox
                        label='remember me'
                        checked={rememberMe}
                        onChange={() => setRememberMe(!this.state.rememberMe)}
                    />
                </Form.Field>
                <Button type='submit'>Login</Button>
            </Form>
        </AppLayout>
    )
}

export default Login
