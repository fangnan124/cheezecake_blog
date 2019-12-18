import React, {useContext} from 'react'
import {Menu, Container, Image, Icon, Dropdown} from 'semantic-ui-react'
import UserContext from 'contexts/user_context'
import Link from 'next/link'
import Router from 'next/router'
import {useCookies} from "react-cookie";
import Auth from "models/auth";

const Header = () => {
    const { user, setUser } = useContext(UserContext)
    const [_cookies, _setCookie, removeCookie] = useCookies(['access-token', 'client', 'uid'])

    const logout = () => {
        Auth.sign_out()
            .then(() => {
                removeCookie('access-token')
                removeCookie('client')
                removeCookie('uid')
                setUser(null)
                Router.push('/')
            })
            .catch(error => {
                // const { errors } = error.response.data
            })
    }

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
                    {
                        user ? (
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
                                        <Dropdown.Item onClick={logout}>
                                            <Icon name='log out'/>
                                            Logout
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Menu.Item>
                        ) : (
                            <Menu.Item active={false}>
                                <Link href={`/auth/sign_up?from=${Router.asPath}`}>
                                    <a>Sign up</a>
                                </Link>
                                <span style={{ margin: '0 10px', color: 'lightgray' }}>|</span>
                                <Link href={`/auth/login?from=${Router.asPath}`}>
                                    <a>Login</a>
                                </Link>
                            </Menu.Item>
                        )
                    }
                </Menu.Menu>
            </Container>
        </Menu>
    )
}

export default Header