import React, {useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import _Form from './_Form'
import {useFetch, useUpdate} from 'components/posts/hooks'

const Edit = (props) => {
    const [fetchState, fetch] = useFetch(props.match.params.id)
    const [updateState, update] = useUpdate(props.match.params.id)

    useEffect(() => fetch(), [])

    if (updateState.redirect) return <Redirect to={{ pathname: '/posts' }} />
    if (fetchState.loading) return null
    return <_Form submit={update} post={fetchState.data.post} errors={fetchState.errors} />
}

export default Edit