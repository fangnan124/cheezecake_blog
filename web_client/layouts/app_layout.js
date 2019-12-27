import React from 'react'
// import Head from 'next/head'
import Header from './header'
import Footer from './footer'
import { Container } from 'semantic-ui-react'

export default ({ children }) => (
    <div>
        <Header/>

        <Container text style={{ padding: '3em 0' }} className='main'>
            {children}
        </Container>

        <Footer/>
    </div>
)
