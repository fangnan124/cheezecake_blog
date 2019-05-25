import React from 'react'

class Tag extends React.Component {
    render() {
        return (
            <span style={{
                color: 'white',
                backgroundColor: this.props.color,
                fontSize: 12,
                borderRadius: 2,
                padding: '3px 6px',
                margin: 2,
                minWidth: 0,
                boxSizing: 'border-box'
            }}>
                { this.props.label }
            </span>
        )
    }
}

export default Tag