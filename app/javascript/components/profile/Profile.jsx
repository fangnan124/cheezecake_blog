import React from 'react'
import axios from 'axios'
import {Form} from 'semantic-ui-react'
import UserContext from 'components/contexts/UserContext'

class Profile extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props)
        this.state = {
            data: {},
            redirect: false,
            loading: true,
            errors: {}
        }
    }

    componentDidMount() {
        this.setState({ loading: true })
        axios({
            method: 'get',
            url: `/api/v1/users/${this.context.user.id}`
        }).then(response => {
            const { data } = response.data
            this.setState({ data, loading: false })
        }).catch(error => {
            const { errors } = error.response.data
            this.setState({ errors, loading: false })
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({ loading: true })
        axios({
            method: 'put',
            url: `/api/v1/users/${this.context.user.id}`,
            data: { user: { name: this.state.data.user.name } }
        }).then(response => {
            const { data } = response.data
            this.setState({ data, loading: false })
        }).catch(error => {
            const { errors } = error.response.data
            this.setState({ errors, loading: false })
        })
    }

    render() {
        if (this.state.loading) return null
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                    <label>Name</label>
                    <input
                        type="text"
                        value={this.state.data.user.name}
                        onChange={e => {
                            const newState = Object.assign({}, this.state)
                            newState.data.user.name = e.target.value
                            this.setState(newState)
                        }}
                    />
                </Form.Field>
                <Form.Button content='Save' labelPosition='left' icon='edit' primary/>
            </Form>
        )
    }
}

export default Profile
