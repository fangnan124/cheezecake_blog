import React, {useState, useEffect, useContext} from 'react'
import {Button, Form, Checkbox, Message} from 'semantic-ui-react'
import UserContext from 'contexts/user_context'
import AppLayout from 'layouts/app_layout'
import Router from 'next/router'
import {useCookies} from 'react-cookie'
import AuthModel from 'models/auth_model'

const Login = () => {
    const [_cookies, setCookie] = useCookies(['access-token', 'client', 'uid'])
    const {setUser} = useContext(UserContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [errors, setErrors] = useState({})

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

        AuthModel.sign_in({ email, password })
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
                Router.push(Router.query.from || '/')
            }).catch(error => {
                const { errors } = error.response.data
                setErrors(errors)
            })
    }

    return (
        <AppLayout>
            { errors.length > 0 && <Message negative list={errors}/> }
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <Form.Input
                        fluid
                        label='Email'
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <Form.Input
                        fluid
                        label='Password'
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <Checkbox
                        label='Remember me'
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
