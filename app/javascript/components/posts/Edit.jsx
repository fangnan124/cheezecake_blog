import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Form from "./Form";

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            data: {},
            errors: {},
            loading: true
        };
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

    handleSubmit = (params) => {
        axios({
            method: "put",
            url: `/api/v1/posts/${this.props.match.params.id}`,
            data: params
        }).then(() => {
            this.setState({ redirect: true });
        }).catch(error => {
            const { errors } = error.response.data;
            this.setState({ errors, loading: false });
        });
    };

    render() {
        if (this.state.loading) return null;
        if (this.state.redirect) return <Redirect to={{ pathname: "/posts" }} />;
        return (
            <Form
                submit={this.handleSubmit}
                post={this.state.data.post}
                errors={this.state.errors}
            />
        )
    }
}

export default Edit;