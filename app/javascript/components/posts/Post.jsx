import React from "react";
import axios from "axios";
import {
    Container,
    Header
} from 'semantic-ui-react';

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            errors: {},
            loading: true
        }
    }

    componentDidMount() {
        this.setState({ loading: true });
        axios({
            method: "get",
            url: `/api/v1/posts/${this.props.match.params.id}`
        }).then(response => {
            const { data } = response.data;
            this.setState({ data, loading: false });
        }).catch(error => {
            const { errors } = error.response.data;
            this.setState({ errors, loading: false });
        });
    }

    render() {
        const { post } = this.state.data;
        if (this.state.loading) return null;
        return (
            <Container text style={{ marginTop: '7em' }}>
                <Header as='h1'>{ post.title }</Header>
                <p>{ post.content }</p>
            </Container>
        );
    }
}

export default Post;