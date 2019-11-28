import React from 'react'
import _Form from './_form'
import {useCreate} from 'models/post'
import AppLayout from 'layouts/app'

const New = () => {
    const [state, create] = useCreate()
    return (
        <AppLayout>
            <_Form submit={create} errors={state.errors}/>
        </AppLayout>
    )
}

export default New