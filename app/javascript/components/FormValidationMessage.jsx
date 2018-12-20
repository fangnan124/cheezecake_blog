import React from 'react'

class FormValidationMessage extends React.Component {
    render() {
        const { errors, property } = this.props
        return (
            errors.hasOwnProperty(property) && (
                errors[property].map((error, index) => {
                    return <div key={index}>{ error }</div>
                })
            )
        )
    }
}

export default FormValidationMessage