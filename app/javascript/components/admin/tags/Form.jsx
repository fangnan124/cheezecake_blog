import React from 'react'
import { Form } from 'semantic-ui-react'
import { CompactPicker } from 'react-color'

class _Form extends React.Component {
    static defaultProps = {
        tag: {
            name: '',
            color: ''
        }
    };

    constructor(props) {
        super(props)
        this.state = {
            name: props.tag.name,
            color: props.tag.color,
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.submit({
            name: this.state.name,
            color: this.state.color
        })
    };

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                    <label>Name</label>
                    <input
                        type="text"
                        value={this.state.name}
                        onChange={e => this.setState({ name: e.target.value })}
                    />
                </Form.Field>
                <Form.Field>
                    <CompactPicker
                        color={ this.state.color }
                        onChangeComplete={ ({ hex }) => this.setState({ color: hex }) }
                        colors={
                            [
                                '#db2828',
                                '#f2711c',
                                '#fbbd08',
                                '#b5cc18',
                                '#21ba45',
                                '#00b5ad',
                                '#2185d0',
                                '#6435c9',
                                '#a333c8',
                                '#e03997',
                                '#a5673f',
                                '#767676'
                            ]
                        }
                    />
                </Form.Field>
                <Form.Button content='Save' labelPosition='left' icon='edit' primary/>
            </Form>
        )
    }
}

export default _Form