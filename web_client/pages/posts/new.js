import React, {useState} from 'react'
import _Form from './_form'
import AppLayout from 'layouts/app'
import Router from 'next/router'
import Post from 'models/post'
import WithError from 'components/with_error'

const New = () => {
    const [errors, setErrors] = useState([])

    const handleSubmit = (params) => {
        Post.create({params})
            .then(() => Router.push('/posts'))
            .catch(error => setErrors(error.response.data.errors))
    }

    return (
        <AppLayout>
            <_Form submit={handleSubmit} errors={errors}/>
        </AppLayout>
    )
}

New.getInitialProps = async function(context) {
    Post.setCookies(context)
    return await Post.resolved.new()
}

export default WithError(New)