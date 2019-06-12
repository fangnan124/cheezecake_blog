import React from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
import { Tab } from 'semantic-ui-react'
import Profile from './Profile'

const panes = [
    { menuItem: 'Profile', render: () => <Tab.Pane><Profile/></Tab.Pane> },
    { menuItem: 'Likes', render: () => <Tab.Pane>TODO</Tab.Pane> },
    { menuItem: 'Bookmarks', render: () => <Tab.Pane>TODO</Tab.Pane> },
]

class Index extends React.Component {
    render() {
        return (
            <div>
                <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
            </div>
        )
    }
}

export default withRouter(Index)
