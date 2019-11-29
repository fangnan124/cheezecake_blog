const errorMessage = ({ errors, property, pointing }) => {
    if (!errors.hasOwnProperty(property)) return false
    if (!pointing) { pointing = 'above' }

    return {
        content: errors[property].map((message, index) => <p key={index}>{message}</p>),
        pointing
    }
}

export { errorMessage }