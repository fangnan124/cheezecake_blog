import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import objectToFormData from 'object-to-formdata'
import _Form from './_Form'

const Edit = (props) => {
    // const [redirect, setRedirect] = useState(false)
    const [showLoading, data, showErrors] = usePostShow(props.match.params.id)
    const [loading, errors, redirect, handleSubmit] = usePostCreate()

    // const handleSubmit = (params) => {
    //     axios({
    //         method: 'put',
    //         url: `/api/v1/posts/${props.match.params.id}`,
    //         data: objectToFormData(params),
    //         headers: { 'content-type': 'multipart/form-data' }
    //     }).then(() => {
    //         setRedirect(true)
    //     }).catch(error => {
    //         const { errors } = error.response.data
    //         // setErrors(errors)
    //     })
    // }

    console.log(redirect)

    if (redirect) return <Redirect to={{ pathname: '/posts' }} />
    if (loading || showLoading) return null
    return <_Form submit={handleSubmit} post={data.post} errors={errors || showErrors} />
}

export default Edit