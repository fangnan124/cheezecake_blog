import React from 'react'
import { Menu, Container, Image, Icon } from 'semantic-ui-react'
import UserContext, { UserConsumer } from 'contexts/UserContext'
import axios from 'axios'
import { Dropdown } from 'semantic-ui-react'
import Link from 'next/link'

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
                        <Link href={'/'}>
                            <a>PEACE OF CAKE</a>
                        </Link>
                    </Menu.Item>
                    <Menu.Item active={false}>
                        <Link href={'/posts'}>
                            <a>Posts</a>
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
                                                            <Link href={'/posts/new'}>
                                                                <a>
                                                                    <Icon name='add'/> New Post
                                                                </a>
                                                            </Link>
                                                        </Dropdown.Item>,
                                                        <Dropdown.Item key='admin'>
                                                            <Link href={'/admin'}>
                                                                <a>
                                                                    <Icon name='key'/> Admin
                                                                </a>
                                                            </Link>
                                                        </Dropdown.Item>
                                                    ]
                                                }
                                                <Dropdown.Item>
                                                    <Link href={'/profile'}>
                                                        <a>
                                                            <Icon name='user circle'/> Profile
                                                        </a>
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
                                        <Link href={'/auth/sign_up'}>
                                            <a>Sign up</a>
                                        </Link>
                                        <span style={{ margin: '0 10px', color: 'lightgray' }}>|</span>
                                        <Link href={'/auth/login'}>
                                            <a>Login</a>
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

export default Header