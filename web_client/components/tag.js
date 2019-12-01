import React from 'react'

const Tag = ({ color, label }) => (
    <span style={{
        color: 'white',
        backgroundColor: color,
        fontSize: 12,
        borderRadius: 2,
        padding: '3px 6px',
        margin: 2,
        minWidth: 0,
        boxSizing: 'border-box'
    }}>
        { label }
    </span>
)

export default Tag