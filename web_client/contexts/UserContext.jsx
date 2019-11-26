import React from 'react'
import axios from 'axios'

const UserContext = React.createContext()

export class UserProvider extends React.Component {
    state = {
        loading: true,
        user: null,
        setUser: user => {
            console.log(user)
            this.setState({ user })
        }
    };

    componentDidMount() {
        this.setState({ loading: true })
        axios({
            method: 'get',
            url: 'http://localhost:3030/auth/validate_token'
        }).then(response => {
            this.setState({ user: response.data.data.user, loading: false})
        }).catch(error => {
            const { errors } = error.response.data
            this.setState({ errors, loading: false })
        })
    }

    render() {
        if (this.state.loading) return null
        return (
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}

export class UserConsumer extends React.Component {
    render() {
        return (
            <UserContext.Consumer>
                {this.props.children}
            </UserContext.Consumer>
        )
    }
}

export default UserContext