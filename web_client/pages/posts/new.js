import React, {useState} from 'react'
import _Form from './_form'
import AppLayout from 'layouts/app'
import Router from 'next/router'
import Post from "models/post"

const New = () => {
    const [errors, setErrors] = useState([])

    const handleSubmit = (params) => {
        Post.create({ params })
            .then(response => {
                Router.push('/posts')
            }).catch(error => {
                const { errors } = error.response.data
                setErrors(errors)
            })
    }

    return (
        <AppLayout>
            <_Form submit={handleSubmit} errors={errors}/>
        </AppLayout>
    )
}

export default New