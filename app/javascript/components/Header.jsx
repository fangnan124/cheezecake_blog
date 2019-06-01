import React from 'react'
import { Menu, Container, Image } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import UserContext, { UserConsumer } from './contexts/UserContext'
import axios from 'axios'
import { Dropdown } from 'semantic-ui-react'

class Header extends React.Component {
    static contextType = UserContext;

    logout = () => {
        axios({
            method: 'delete',
            url: '/auth/sign_out',
            headers: {
                'access-token': localStorage.getItem('access-token'),
                'client': localStorage.getItem('client'),
                'uid': localStorage.getItem('uid')
            }
        }).then(() => {
            localStorage.removeItem('access-token')
            localStorage.removeItem('client')
            localStorage.removeItem('uid')
            this.context.setUser(null)
            this.props.history.push('/')
        }).catch(error => {
            const { errors } = error.response.data
            this.setState({ errors, loading: false })
        })
    };

    render() {
        return (
            <Menu text>
                <Container>
                    <Image src='/cheezecake.png' width={50} height={35}/>
                    <Menu.Item header>
                        <Link to={'/'} style={{ color: 'black' }}>
                            Cheezecake Blog
                        </Link>
                    </Menu.Item>
                    <Menu.Item active={false}>
                        <Link to={'/posts'}>
                            Posts
                        </Link>
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        <UserConsumer>
                            { ({ user }) => {
                                return user ? (
                                    <Menu.Item active={false}>
                                        <Dropdown text={ user.email.split('@')[0] }>
                                            <Dropdown.Menu>
                                                <Dropdown.Item text='Profile'/>
                                                <Dropdown.Item text='Tags'/>
                                                <Dropdown.Divider />
                                                <Dropdown.Item text='Logout' onClick={this.logout}/>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Menu.Item>
                                ) : (
                                    <Menu.Item active={false}>
                                        <Link to={'/login'}>
                                            Login
                                        </Link>
                                    </Menu.Item>
                                )
                            }}
                        </UserConsumer>
                    </Menu.Menu>
                </Container>
            </Menu>
        )
    }
}

export default withRouter(Header)