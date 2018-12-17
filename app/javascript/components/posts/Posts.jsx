import React from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";

class Posts extends React.Component {
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
            url: "/api/v1/posts"
        }).then(response => {
            const { data } = response.data;
            this.setState({ data, loading: false });
        }).catch(error => {
            const { errors } = error.response.data;
            this.setState({ errors, loading: false });
        });
    }

    delete = (id) => {
        this.setState({ loading: true });
        axios({
            method: "delete",
            url: `/api/v1/posts/${id}`
        }).then(response => {
            const { data } = response.data;
            this.setState({ data, loading: false });
        }).catch(error => {
            const { errors } = error.response.data;
            this.setState({ errors, loading: false });
        });
    };

    render() {
        if (this.state.loading) return null;
        return (
            <div>
                {
                    this.state.data.posts.map(post => {
                        return (
                            <div key={ post.id }>
                                <Link to={`/posts/${post.id}`}>{ post.title }</Link>
                                <Link to={`/posts/${post.id}/edit`}>edit</Link>
                                <a href="javascript:" onClick={() => this.delete(post.id)}>delete</a>
                            </div>
                        );
                    })
                }
                <Link to={'/posts/new'}>New</Link>
            </div>
        );
    }
}

export default withRouter(Posts);
