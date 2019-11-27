import React, {useState, useEffect} from 'react'
import axios from 'axios'

const UserContext = React.createContext()

export const UserProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
        setLoading(true)
        axios({
            method: 'get',
            url: `${process.env.domain}/auth/validate_token`
        }).then(response => {
            setUser(response.data.data.user)
        }).catch(error => {
            const { errors } = error.response.data
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    if (loading) return null
    return (
        <UserContext.Provider value={{ loading, user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const UserConsumer = ({ children }) => {
    return (
        <UserContext.Consumer>
            {children}
        </UserContext.Consumer>
    )
}

export default UserContext