import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import _Form from './_Form'
import objectToFormData from 'object-to-formdata'

class Edit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false,
            data: {},
            errors: {},
            loading: true
        }
    }

    componentDidMount() {
        this.setState({ loading: true })
        axios({
            method: 'get',
            url: `/api/v1/posts/${this.props.match.params.id}`
        }).then(response => {
            const { data } = response.data
            this.setState({ data, loading: false })
        }).catch(error => {
            const { errors } = error.response.data
            this.setState({ errors, loading: false })
        })
    }

    handleSubmit = (params) => {
        // let form_data = new FormData()

        const form_data = objectToFormData(
            params
        )

        // for (const param in params) {
        //     if (Array.isArray(params[param])) {
        //
        //         params[param].each(p => {
        //             form_data.append(param, params[param])
        //         });
        //     } else {
        //         form_data.append(param, params[param])
        //     }
        // }

        axios({
            method: 'put',
            url: `/api/v1/posts/${this.props.match.params.id}`,
            data: form_data,
            headers: { 'content-type': 'multipart/form-data' }
        }).then(() => {
            this.setState({ redirect: true })
        }).catch(error => {
            const { errors } = error.response.data
            this.setState({ errors, loading: false })
        })
    };

    render() {
        if (this.state.loading) return null
        if (this.state.redirect) return <Redirect to={{ pathname: '/posts' }} />
        return (
            <_Form
                submit={this.handleSubmit}
                post={this.state.data.post}
                errors={this.state.errors}
            />
        )
    }
}

export default Edit