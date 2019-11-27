import React from 'react'
import App from 'next/app'
import { UserProvider } from 'contexts/user_context'
import axios from 'axios'
import 'semantic-ui-css/semantic.min.css'
import 'css/application.scss'

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    config.headers['access-token'] = localStorage.getItem('access-token')
    config.headers['client'] = localStorage.getItem('client')
    config.headers['uid'] = localStorage.getItem('uid')

    return config
}, function (error) {
    // Do something with request error
    return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response
}, function (error) {
    // Do something with response error
    return Promise.reject(error)
})

class MyApp extends App {
    // Only uncomment this method if you have blocking data requirements for
    // every single page in your application. This disables the ability to
    // perform automatic static optimization, causing every page in your app to
    // be server-side rendered.
    //
    // static async getInitialProps(appContext) {
    //   // calls page's `getInitialProps` and fills `appProps.pageProps`
    //   const appProps = await App.getInitialProps(appContext);
    //
    //   return { ...appProps }
    // }

    render() {
        const { Component, pageProps } = this.props
        return (
            <UserProvider>
                <Component {...pageProps} />
            </UserProvider>
        )
    }
}

export default MyApp