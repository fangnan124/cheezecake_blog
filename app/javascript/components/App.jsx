import React from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import { UserProvider } from './contexts/UserContext'

class App extends React.Component {
    render() {
        return (
            <UserProvider>
                <div style={{ paddingTop: '.5em' }}> {/* To avoid margin-top from <Header/> */}
                    <Header/>
                    <Main/>
                    <Footer/>
                </div>
            </UserProvider>
        )
    }
}

export default App