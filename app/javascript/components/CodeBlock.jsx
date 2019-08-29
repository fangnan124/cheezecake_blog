import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Highlight from 'react-highlight'

class CodeBlock extends PureComponent {
    static propTypes = {
        value: PropTypes.string.isRequired,
        language: PropTypes.string
    };

    static defaultProps = {
        language: null
    };

    render() {
        const { language, value } = this.props
        return (
            <div style={{ fontSize: 13, lineHeight: '18px' }}>
                <Highlight className={language}>
                    {value}
                </Highlight>
            </div>
        )
    }
}

export default CodeBlock