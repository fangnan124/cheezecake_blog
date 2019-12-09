import React from 'react'
import _Form from './_form'
import {useCreate} from 'hooks/post'
import AppLayout from 'layouts/app'
import Router from 'next/router'
import Error from "next/error"

const New = () => {
    const [state, create] = useCreate()

    if (state.meta.status) {
        switch (state.meta.status) {
            case '200': Router.push('/posts')
            default: return <Error statusCode={props.meta.status} />
        }
    }

    return (
        <AppLayout>
            <_Form submit={create} errors={state.errors}/>
        </AppLayout>
    )
}

export default New