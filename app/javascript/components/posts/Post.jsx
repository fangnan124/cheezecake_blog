import React from "react";
import axios from "axios";

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
            <div>
                <div>{ post.title }</div>
                <div>{ post.content }</div>
            </div>
        );
    }
}

export default Post;