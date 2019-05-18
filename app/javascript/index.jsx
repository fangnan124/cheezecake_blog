import React from 'react'
import ReactDOM from 'react-dom'
import App from 'components/App'
import { BrowserRouter as Router } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import './css/ck-editor-override.css'

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Router>
            <App/>
        </Router>,
        document.getElementById('app')
    )
})
