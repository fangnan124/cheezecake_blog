import React from 'react'
import { Menu, Container, Image, Icon } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import UserContext, { UserConsumer } from './contexts/UserContext'
import axios from 'axios'
import { Dropdown } from 'semantic-ui-react'

class Header extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props)
        this.state = {
            redirect: false,
            errors: {}
        }
    }

    logout = () => {
        axios({
            method: 'delete',
            url: '/auth/sign_out'
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
                            PEACE OF CAKE
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
                                        <Image src={user.avatar_url} style={{ width: 30, marginRight: 10 }} circular/>
                                        <Dropdown text={ user.name } closeOnBlur>
                                            <Dropdown.Menu>
                                                {
                                                    user && user.role === 'writer' && [
                                                        <Dropdown.Item key='new_post'>
                                                            <Link to={'/posts/new'}>
                                                                <Icon name='add'/>
                                                                New Post
                                                            </Link>
                                                        </Dropdown.Item>,
                                                        <Dropdown.Item key='admin'>
                                                            <Link to={'/admin'}>
                                                                <Icon name='key'/>
                                                                Admin
                                                            </Link>
                                                        </Dropdown.Item>
                                                    ]
                                                }
                                                <Dropdown.Item>
                                                    <Link to={'/profile'}>
                                                        <Icon name='user circle'/>
                                                        Profile
                                                    </Link>
                                                </Dropdown.Item>
                                                <Dropdown.Divider />
                                                <Dropdown.Item onClick={this.logout}>
                                                    <Icon name='log out'/>
                                                    Logout
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Menu.Item>
                                ) : (
                                    <Menu.Item active={false}>
                                        <Link to={'/sign_up'}>
                                            Sign up
                                        </Link>
                                        <span style={{ margin: '0 10px', color: 'lightgray' }}>|</span>
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