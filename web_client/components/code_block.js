import React from 'react'
import PropTypes from 'prop-types'
import Highlight from 'react-highlight'

const CodeBlock = ({ language, value }) => (
    <div className='code-block'>
        <Highlight className={language}>
            {value}
        </Highlight>
    </div>
)

CodeBlock.propTypes = {
    value: PropTypes.string.isRequired,
    language: PropTypes.string
}

CodeBlock.defaultProps = {
    language: null
}

export default CodeBlock