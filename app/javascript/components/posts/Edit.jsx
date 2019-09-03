import React, {useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import _Form from './_Form'
import {useFetch, useUpdate} from 'components/posts/hooks'

const Edit = (props) => {
    const [data, fetch, loading, errors] = useFetch(props.match.params.id)
    const [_data, update, redirect] = useUpdate(props.match.params.id)

    useEffect(() => fetch(), [])

    if (redirect) return <Redirect to={{ pathname: '/posts' }} />
    if (loading) return null
    return <_Form submit={update} post={data.post} errors={errors} />
}

export default Edit