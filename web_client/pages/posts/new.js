import React, {useState} from 'react'
import _Form from './_form'
import AppLayout from 'layouts/app_layout'
import Router from 'next/router'
import PostModel from 'models/post_model'
import WithError from 'components/with_error'

const New = () => {
    const [errors, setErrors] = useState([])

    const handleSubmit = (params) => {
        PostModel.create({params})
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
    PostModel.setCookies(context)
    return await PostModel.resolved.new()
}

export default WithError(New)
