import React, {useState} from 'react'
import { Form } from 'semantic-ui-react'
import { CompactPicker } from 'react-color'

const _Form = (props) => {
    const [name, setName] = useState(props.tag.name)
    const [color, setColor] = useState(props.tag.color)

    const submit = (event) => {
        event.preventDefault()
        props.submit({ name, color })
    }

    return (
        <Form onSubmit={submit}>
            <Form.Field>
                <label>Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <label>Color</label>
                <CompactPicker
                    color={color}
                    onChangeComplete={ ({ hex }) => setColor(hex) }
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

_Form.defaultProps = {
    tag: {
        name: '',
        color: ''
    }
};

export default _Form