import React from 'react'

class FormValidationMessage extends React.Component {
    render() {
        const { errors, property } = this.props
        return (
            errors.hasOwnProperty(property) && (
                errors[property].map((message, index) => (
                    <div key={index} style={{ color: '#9f3a38', margin: '0 5px' }}>{ message }</div>
                ))
            )
        )
    }
}

export default FormValidationMessage