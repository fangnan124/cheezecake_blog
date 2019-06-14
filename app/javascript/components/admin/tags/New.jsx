import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Form from './Form'

class New extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            color: '',
            redirect: false,
            loading: false,
            errors: {}
        }
    }

    handleSubmit = (params) => {
        this.setState({ loading: true })
        axios({
            method: 'post',
            url: '/api/v1/tags',
            data: { tag: params }
        }).then(response => {
            this.props.onSuccess()
        }).catch(error => {
            const { errors } = error.response.data
            this.setState({ errors, loading: false })
        })
    }

    render() {
        if (this.state.redirect) return <Redirect to={{ pathname: '/posts' }} />
        return (
            <Form submit={this.handleSubmit} errors={this.state.errors}/>
        )
    }
}

export default New