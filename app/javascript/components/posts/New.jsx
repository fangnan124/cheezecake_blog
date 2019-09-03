import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import objectToFormData from 'object-to-formdata'
import _Form from './_Form'
import {useCreate} from "./hooks";

const New = (props) => {
    const [data, create, redirect, errors] = useCreate(props.match.params.id)

    if (redirect) return <Redirect to={{ pathname: '/posts' }}/>
    return <_Form submit={create} errors={errors}/>
}

export default New