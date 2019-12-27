import React from 'react'
import axios from 'axios'
import Select from 'react-select'
import chroma from 'chroma-js'
import classnames from 'classnames'
import TagModel from 'models/tag_model'

// Make this similar usage with From.Input
class TagsSelect extends React.Component {
    static defaultProps = {
        selected_tags: []
    }

    constructor(props) {
        super(props)
        this.state = {
            data: {},
            errors: {},
            loading: true
        }
    }

    componentDidMount() {
        this.setState({ loading: true })
        TagModel.all()
            .then(response => {
                const { data } = response.data
                this.setState({ data, loading: false })
            })
            .catch(error => {
                const { errors } = error.response.data
                this.setState({ errors, loading: false })
            })
    }

    get options() {
        return this.state.data.tags.map(tag => {
            return {
                value: tag.id,
                label: tag.name,
                color: tag.color
            }
        })
    }

    get selected() {
        const tag_ids = this.props.selected_tags.map(tag => tag.id)
        return this.options.filter(option => tag_ids.includes(option.value))
    }

    render() {
        if (this.state.loading) return null

        const hasError = this.props.error

        const errorStyle = hasError ? {
            background: '#fff6f6',
            borderColor: '#e0b4b4',
            color: '#9f3a38'
        } : {}

        const colourStyles = {
            control: styles => ({ ...styles, backgroundColor: 'white', ...errorStyle }),
            option: (styles, { data, isDisabled, isFocused, isSelected }) => {
                const color = chroma(data.color)
                return {
                    ...styles,
                    backgroundColor: isDisabled
                        ? null
                        : isSelected ? data.color : isFocused ? color.alpha(0.1).css() : null,
                    color: isDisabled
                        ? '#ccc'
                        : isSelected
                            ? chroma.contrast(color, 'white') > 2 ? 'white' : 'black'
                            : data.color,
                    cursor: isDisabled ? 'not-allowed' : 'default',

                    ':active': {
                        ...styles[':active'],
                        backgroundColor: !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
                    },
                }
            },
            multiValue: (styles, { data }) => {
                const color = chroma(data.color)
                return {
                    ...styles,
                    backgroundColor: color.alpha(0.9).css(),
                }
            },
            multiValueLabel: (styles) => ({
                ...styles,
                color: 'white',
            }),
            multiValueRemove: (styles, { data }) => ({
                ...styles,
                color: data.color,
                ':hover': {
                    backgroundColor: data.color,
                    color: 'white',
                },
            }),
        }

        return (
            <div className={classnames({ 'error': hasError }, 'field')}>
                { this.props.label && <label>{this.props.label}</label> }
                <Select
                    closeMenuOnSelect={false}
                    defaultValue={this.selected}
                    isMulti
                    options={this.options}
                    styles={colourStyles}
                    onChange={tags => {
                        const tag_ids = tags.map(s => s.value)
                        this.props.onChange(tag_ids)
                    }}
                />
                {
                    hasError && (
                        <div className="ui pointing prompt label">
                            { this.props.error.content }
                        </div>
                    )
                }
            </div>
        )
    }
}

export default TagsSelect
