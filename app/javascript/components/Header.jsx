import React from "react";
import { Menu, Container, Image } from 'semantic-ui-react';
import { Link, withRouter } from "react-router-dom";

class Header extends React.Component {
    render() {
        return (
            <Menu text>
                <Container>
                    <Image src='/cheezecake.png' width={50}/>
                    <Menu.Item header>
                        <Link to={'/'} style={{ color: "black" }}>
                            Cheezecake Blog
                        </Link>
                    </Menu.Item>
                    <Menu.Item
                        name='posts'
                        active={false}
                    />
                    <Menu.Item
                        name='login'
                        active={false}
                    />
                </Container>
            </Menu>
        );
    }
}

export default withRouter(Header);