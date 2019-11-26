import React from 'react'
import axios from 'axios'
import Select from 'react-select'
import chroma from 'chroma-js'

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
        axios({
            method: 'get',
            url: `${process.env.api_prefix}/tags`
        }).then(response => {
            const { data } = response.data
            this.setState({ data, loading: false })
        }).catch(error => {
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

        const colourStyles = {
            control: styles => ({ ...styles, backgroundColor: 'white' }),
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
        )
    }
}

export default TagsSelect