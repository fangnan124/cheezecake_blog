import React, {useState} from 'react'
import axios from 'axios'
import { Message } from 'semantic-ui-react'
import _Form from './_Form'

const New = () => {
    const [success, setSuccess] = useState(false)
    const [errors, setErrors] = useState({})

    const send = (params) => {
        axios({
            method: 'post',
            url: `${process.env.api_prefix}/invitation_requests`,
            data: { invitation_request: params }
        }).then(() => {
            setSuccess(true)
        }).catch(error => {
            const { errors } = error.response.data
        })
    }

    return (
        success ? (
            <Message positive>
                <p>
                    Success
                </p>
            </Message>
        ) : (
            <_Form submit={send} errors={errors}/>
        )
    )
}

export default New