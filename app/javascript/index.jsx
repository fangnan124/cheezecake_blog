import React from 'react'
import ReactDOM from 'react-dom'
import App from 'components/App'
import { BrowserRouter as Router } from 'react-router-dom'
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

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Router>
            <App/>
        </Router>,
        document.getElementById('app')
    )
})
