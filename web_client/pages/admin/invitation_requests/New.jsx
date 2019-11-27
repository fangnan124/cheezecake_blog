import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Message } from 'semantic-ui-react'
import _Form from './_Form'

class New extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            color: '',
            redirect: false,
            loading: false,
            errors: {},
            success: false
        }
    }

    handleSubmit = (params) => {
        this.setState({ loading: true })
        axios({
            method: 'post',
            url: '/api/v1/invitation_requests',
            data: { invitation_request: params }
        }).then(() => {
            this.setState({ success: true })
        }).catch(error => {
            const { errors } = error.response.data
            this.setState({ errors, loading: false })
        })
    }

    render() {
        if (this.state.redirect) return <Redirect to={{ pathname: '/posts' }} />
        return (
            this.state.success ? (
                <Message positive>
                    <p>
                        Success
                    </p>
                </Message>
            ) : (
                <_Form submit={this.handleSubmit} errors={this.state.errors}/>
            )
        )
    }
}

export default New