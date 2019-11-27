import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Form from './form'

const Edit = (props) => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        setLoading(true)
        axios({
            method: 'get',
            url: `${process.env.api_prefix}/tags/${props.id}`
        }).then(response => {
            const { data } = response.data
            setData(data)
        }).catch(error => {
            const { errors } = error.response.data
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    const update = (params) => {
        axios({
            method: 'put',
            url: `${process.env.api_prefix}/tags/${props.id}`,
            data: params
        }).then(() => {
            props.onSuccess()
        }).catch(error => {
            const { errors } = error.response.data
        })
    }

    if (loading) return null
    return <Form submit={update} tag={data.tag} errors={errors}/>
}

export default Edit