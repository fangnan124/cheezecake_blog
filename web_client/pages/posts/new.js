import React from 'react'
import {Redirect} from 'react-router-dom'
import _Form from './_form'
import {useCreate} from './hooks'

const New = (props) => {
    const [createState, create] = useCreate(props.match.params.id)
    if (createState.redirect) return <Redirect to={{ pathname: '/posts' }}/>
    return <_Form submit={create} errors={createState.errors}/>
}

export default New