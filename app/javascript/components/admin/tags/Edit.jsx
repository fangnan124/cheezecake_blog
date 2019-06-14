import React from 'react'
import axios from 'axios'
import Form from './Form'

class Edit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            errors: {},
            loading: true
        }
    }

    componentDidMount() {
        this.setState({ loading: true })
        axios({
            method: 'get',
            url: `/api/v1/tags/${this.props.id}`
        }).then(response => {
            const { data } = response.data
            this.setState({ data, loading: false })
        }).catch(error => {
            const { errors } = error.response.data
            this.setState({ errors, loading: false })
        })
    }

    handleSubmit = (params) => {
        axios({
            method: 'put',
            url: `/api/v1/tags/${this.props.id}`,
            data: params
        }).then(() => {
            this.props.onSuccess()
        }).catch(error => {
            const { errors } = error.response.data
            this.setState({ errors, loading: false })
        })
    };

    render() {
        if (this.state.loading) return null
        return (
            <Form
                submit={this.handleSubmit}
                tag={this.state.data.tag}
                errors={this.state.errors}
            />
        )
    }
}

export default Edit