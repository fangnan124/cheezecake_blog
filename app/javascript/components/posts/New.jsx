import React from 'react'
import {Redirect} from 'react-router-dom'
import _Form from './_Form'
import {useCreate} from './hooks'

const New = (props) => {
    const [_data, create, redirect, errors] = useCreate(props.match.params.id)
    if (redirect) return <Redirect to={{ pathname: '/posts' }}/>
    return <_Form submit={create} errors={errors}/>
}

export default New