import React, {useState, useEffect, useContext} from 'react'
import {Button, Form, Message, Modal} from 'semantic-ui-react'
import UserContext from 'contexts/user_context'
import New from 'pages/admin/invitation_requests/new'
import AppLayout from 'layouts/app'
import Router from 'next/router'
import Auth from 'models/auth'
import {useCookies} from "react-cookie";
import {errorMessage} from "helpers/form_helper";

const SignUp = () => {
    const {setUser} = useContext(UserContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [invitationCode, setInvitationCode] = useState('')
    const [errors, setErrors] = useState('')
    const [requestModalOpen, setRequestModalOpen] = useState(false)

    const [_cookies, setCookie] = useCookies(['access-token', 'client', 'uid']);

    useEffect(() => {
        const email = localStorage.getItem('user.email')
        setEmail(email)
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()

        Auth.sing_up({ params: {
                email,
                password,
                name,
                invitation_code: invitationCode
            } })
            .then(response => {
                setCookie('access-token', response.headers['access-token'])
                setCookie('client', response.headers['client'])
                setCookie('uid', response.headers['uid'])

                setUser(response.data.data.user)
                Router.push(Router.query.from || '/')
            })
            .catch(error => {
                const { errors } = error.response.data
                setErrors(errors)
            })
    }

    return (
        <AppLayout>
            <Form onSubmit={handleSubmit}>
                { errors.length > 0 && <Message negative list={errors}/> }
                <Form.Field>
                    <Form.Input
                        fluid
                        label='Email'
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        // error={errorMessage({ errors, property: 'email' })}
                    />
                </Form.Field>
                <Form.Field>
                    <Form.Input
                        fluid
                        label='Password'
                        type="text"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        // error={errorMessage({ errors, property: 'password' })}
                    />
                </Form.Field>
                <Form.Field>
                    <Form.Input
                        fluid
                        label='Name'
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        // error={errorMessage({ errors, property: 'name' })}
                    />
                </Form.Field>
                <Form.Field>
                    <Form.Input
                        fluid
                        label='Invitation Code'
                        type="text"
                        value={invitationCode}
                        onChange={e => setInvitationCode(e.target.value)}
                        // error={errorMessage({ errors, property: 'invitation_code' })}
                    />
                    <div style={{ fontSize: 12, marginTop: 3 }}>
                        Don&#39;t have an invitation code?
                        <span style={{ marginLeft: 5, fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setRequestModalOpen(true)}>request</span>
                    </div>
                </Form.Field>
                <Button type='submit'>Sign Up</Button>
            </Form>
            <Modal open={requestModalOpen} onClose={() => setRequestModalOpen(false)} size={'tiny'} style={{ display: 'inline' }}>
                <Modal.Header>Request an invitation code</Modal.Header>
                <Modal.Content>
                    <New/>
                </Modal.Content>
            </Modal>
        </AppLayout>
    )
}

export default SignUp