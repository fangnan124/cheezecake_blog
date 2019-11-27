import React from 'react'
import { Tab } from 'semantic-ui-react'
import Tags from './tags'
// import Requests from './invitation_requests/Index'
import AppLayout from 'layouts/app'

const Index = () => {
    return (
        <AppLayout>
            <Tab
                menu={{ secondary: true, pointing: true }}
                panes={[
                    { menuItem: 'Tags', render: () => <Tab.Pane><Tags/></Tab.Pane> },
                    { menuItem: 'Users', render: () => <Tab.Pane>Coming Soon</Tab.Pane> },
                    { menuItem: 'Requests', render: () => <Tab.Pane>Coming Soon</Tab.Pane> },
                ]}
            />
        </AppLayout>
    )
}

export default Index