import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import _Form from './_Form'

class New extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false,
            errors: {}
        }
    }

    handleSubmit = (params) => {
        axios({
            method: 'post',
            url: '/api/v1/posts',
            data: params,
            headers: {
                'access-token': localStorage.getItem('access-token'),
                'client': localStorage.getItem('client'),
                'uid': localStorage.getItem('uid')
            }
        }).then(() => {
            this.setState({ redirect: true })
        }).catch(error => {
            const { errors } = error.response.data
            this.setState({ errors, loading: false })
        })
    };

    render() {
        if (this.state.redirect) return <Redirect to={{ pathname: '/posts' }} />
        return (
            <_Form submit={this.handleSubmit} errors={this.state.errors}/>
        )
    }
}

export default New