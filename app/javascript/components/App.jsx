import React from 'react'
import Header from './Header'
import Main from './Main'
import { UserProvider } from './contexts/UserContext'

class App extends React.Component {
    render() {
        return (
            <UserProvider>
                <div style={{ paddingTop: '.5em' }}> {/* To avoid margin-top from <Header/> */}
                    <Header/>
                    <Main/>
                </div>
            </UserProvider>
        )
    }
}

export default App