import React, {useState} from 'react'
import axios from 'axios'
import Form from './form'

const New = (props) => {
    const [errors, setErrors] = useState({})

    const create = (params) => {
        axios({
            method: 'post',
            url: `${process.env.api_prefix}/tags`,
            data: { tag: params }
        }).then(() => {
            props.onSuccess()
        }).catch(error => {
            const { errors } = error.response.data
            setErrors(errors)
        })
    }

    return <Form submit={create} errors={errors}/>
}

export default New