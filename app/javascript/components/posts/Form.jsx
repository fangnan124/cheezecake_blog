import React from "react";

class Form extends React.Component {
    static defaultProps = {
        post: {
            title: '',
            content: ''
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            title: props.post.title,
            content: props.post.content
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.submit({
            title: this.state.title,
            content: this.state.content
        });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    Title:
                    <input
                        type="text"
                        value={this.state.title}
                        onChange={e => this.setState({ title: e.target.value })}
                    />
                </div>
                <div>
                    {
                        this.props.errors.hasOwnProperty("title") && (
                            this.props.errors.title.map(error => {
                                return error
                            })
                        )
                    }
                </div>
                <div>
                    Content:
                    <input
                        type="text"
                        value={this.state.content}
                        onChange={e => this.setState({ content: e.target.value })}
                    />
                </div>
                <div>
                    {
                        this.props.errors.hasOwnProperty("content") && (
                            this.props.errors.content.map(error => {
                                return error
                            })
                        )
                    }
                </div>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

export default Form;