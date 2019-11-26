import React from 'react'

class Float_menu extends React.Component {
    static Item = (props) => (
        <li>
            { props.children }
        </li>
    )

    render() {
        return (
            <ul className='float-menu'>
                { this.props.children }
            </ul>
        )
    }
}

export default Float_menu