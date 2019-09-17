import React from 'react'

class FloatMenu extends React.Component {
    static Item = (props) => (
        <div style={{ textAlign: 'center', color: 'lightgrey', margin: '20px 0' }}>
            { props.children }
        </div>
    )

    render() {
        return (
            <div style={{
                position: 'fixed',
                right: '50%',
                marginRight: '-550px',
                border: 'solid 1px lightgrey',
                backgroundColor: '#faf9f5',
                width: 100
            }}>
                { this.props.children }
            </div>
        )
    }
}

export default FloatMenu