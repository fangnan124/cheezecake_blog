import React from 'react'
import axios from 'axios'

const UserContext = React.createContext()

export class UserProvider extends React.Component {
    state = {
        user: null,
        setUser: user => {
            this.setState({ user })
        }
    };

    componentDidMount() {
        axios({
            method: 'get',
            url: '/auth/validate_token'
        }).then(response => {
            this.setState({ user: response.data.data })
        }).catch(error => {
            const { errors } = error.response.data
            this.setState({ errors, loading: false })
        })
    }

    render() {
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