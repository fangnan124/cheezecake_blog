import React, {useState, useEffect, useContext} from 'react'
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios'
import UserContext from 'contexts/user_context'
import { Modal } from 'semantic-ui-react'
import New from 'pages/admin/invitation_requests/new'
import FormValidationMessage from 'components/form_validation_message'
import AppLayout from 'layouts/app'
import Router from 'next/router'

const SignUp = () => {
    const {setUser} = useContext(UserContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [invitationCode, setInvitationCode] = useState('')
    const [errors, setErrors] = useState('')
    const [requestModalOpen, setRequestModalOpen] = useState(false)

    useEffect(() => {
        const email = localStorage.getItem('user.email')
        setEmail(email)
    }, [])

    const sign_up = (event) => {
        event.preventDefault()

        axios({
            method: 'post',
            url: '/auth',
            data: {
                email,
                password,
                name,
                invitation_code: invitationCode
            }
        }).then(response => {
            localStorage.setItem('access-token', response.headers['access-token'])
            localStorage.setItem('client', response.headers['client'])
            localStorage.setItem('uid', response.headers['uid'])

            setUser(response.data.data)
            Router.push('/posts')
        }).catch(error => {
            const { errors } = error.response.data
            setErrors(errors)
        })
    }

    // pathname = () => {
    //     const { location } = this.props
    //     if (location.state !== undefined) {
    //         return location.state.from.pathname
    //     } else {
    //         return '/'
    //     }
    // };

    return (
        <AppLayout>
            <Form onSubmit={sign_up}>
                <Form.Field>
                    <label>Email</label>
                    <input
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <FormValidationMessage errors={errors} property={'email'}/>
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <FormValidationMessage errors={errors} property={'password'}/>
                </Form.Field>
                <Form.Field>
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <FormValidationMessage errors={errors} property={'name'}/>
                </Form.Field>
                <Form.Field>
                    <label>Invitation Code</label>
                    <input
                        type="text"
                        value={invitationCode}
                        onChange={e => setInvitationCode(e.target.value)}
                    />
                    <FormValidationMessage errors={errors} property={'invitation_code'}/>
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