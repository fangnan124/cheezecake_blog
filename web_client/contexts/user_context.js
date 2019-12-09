import React, {useState, useEffect} from 'react'
import Auth from 'models/auth'

const UserContext = React.createContext()

export const UserProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        setLoading(true)
        Auth.validate_token()
            .then(response => {
                setUser(response.data.data.user)
                setLoading(false)
            }).catch(error => {
                console.log(error)
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

export const UserConsumer = ({ children }) => (
    <UserContext.Consumer>
        {children}
    </UserContext.Consumer>
)

export default UserContext