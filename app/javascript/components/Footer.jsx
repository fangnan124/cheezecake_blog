import React from 'react'
import { Menu, Container } from 'semantic-ui-react'

class Footer extends React.Component {
    render() {
        return (
            <Menu text>
                <Container style={{ padding: '0 10%' }}>
                    <Menu.Item>
                        <div>
                            © 2019 No Pain No Idea, Inc
                        </div>
                    </Menu.Item>
                    <Menu.Item
                        name='About'
                    />
                    {/*<Menu.Menu position='right'>*/}
                    {/*    <Menu.Item*/}
                    {/*        name='About'*/}
                    {/*    />*/}
                    {/*</Menu.Menu>*/}
                </Container>
            </Menu>
        )
    }
}

export default Footer
