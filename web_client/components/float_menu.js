import React from 'react'

const FloatMenu = ({ children }) => (
    <ul className='float-menu'>
        { children }
    </ul>
)

FloatMenu.Item = ({ children }) => (
    <li>{ children }</li>
)

export default FloatMenu