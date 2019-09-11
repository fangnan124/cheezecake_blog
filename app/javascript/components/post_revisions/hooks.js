import { useState } from 'react'
import axios from 'axios'

export const useFetchAll = (postId) => {
    const [data, setData] = useState({})
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(true)

    const fetchAll = (page) => {
        setLoading(true)
        axios({
            method: 'get',
            url: `/api/v1/posts/${postId}/post_revisions`,
            params: { page: page }
        }).then(response => {
            const { data } = response.data
            setData(data)
        }).catch(error => {
            const { errors } = error.response.data
            setErrors(errors)
        }).finally(() => {
            setLoading(false)
        })
    }

    return [{ data, errors, loading }, fetchAll]
}

export const useFetch = (id) => {
    const [data, setData] = useState({})
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(true)

    const fetch = () => {
        setLoading(true)
        axios({
            method: 'get',
            url: `/api/v1/post_revisions/${id}`
        }).then(response => {
            const { data } = response.data
            setData(data)
        }).catch(error => {
            const { errors } = error.response.data
            setErrors(errors)
        }).finally(() => {
            setLoading(false)
        })
    }

    return [{ data, errors, loading }, fetch]
}
