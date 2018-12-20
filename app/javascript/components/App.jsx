import React from 'react'
import Header from './Header'
import Main from './Main'
import { UserProvider } from './contexts/UserContext'

class App extends React.Component {
    render() {
        return (
            <UserProvider>
                <div>
                    <Header/>
                    <Main/>
                </div>
            </UserProvider>
        )
    }
}

export default App