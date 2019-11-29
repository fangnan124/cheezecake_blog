import React from 'react'
import { Message } from 'semantic-ui-react'

const FormValidationMessage = ({ errors, property }) => (
    errors.hasOwnProperty(property) && (
        errors[property].map((message, index) => (
            <Message negative key={index}>
                <p>{ message }</p>
            </Message>
        ))
    )
)

FormValidationMessage.defaultProps = {
    errors: {},
    property: ''
}

export default FormValidationMessage