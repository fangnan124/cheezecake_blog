import React from 'react'
import { Tab } from 'semantic-ui-react'
import Tags from './tags/Index'
import Requests from './invitation_requests/Index'

const panes = [
    { menuItem: 'Tags', render: () => <Tab.Pane><Tags/></Tab.Pane> },
    { menuItem: 'Users', render: () => <Tab.Pane>Coming Soon</Tab.Pane> },
    { menuItem: 'Requests', render: () => <Tab.Pane><Requests/></Tab.Pane> },
]

class Index extends React.Component {
    render() {
        return (
            <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
        )
    }
}

export default Index