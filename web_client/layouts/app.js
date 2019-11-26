import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Header from './header'
import Footer from './footer'
import { Container } from 'semantic-ui-react'

export default ({ children, title = 'This is the default title' }) => (
    <div>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Header/>

        <Container text style={{ padding: '3em 0' }} className='main'>
            {children}
        </Container>

        <Footer/>
    </div>
)