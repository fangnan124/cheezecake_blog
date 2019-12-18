import React from 'react'
import { Tab } from 'semantic-ui-react'
import Profile from './profile'
import AppLayout from 'layouts/app'

const Index = () => {
    return (
        <AppLayout>
            <Tab menu={{ secondary: true, pointing: true }} panes={[
                { menuItem: 'Profile', render: () => <Tab.Pane><Profile/></Tab.Pane> },
                { menuItem: 'Likes', render: () => <Tab.Pane>Coming Soon</Tab.Pane> },
                { menuItem: 'Bookmarks', render: () => <Tab.Pane>Coming Soon</Tab.Pane> },
            ]} />
        </AppLayout>
    )
}

export default Index
