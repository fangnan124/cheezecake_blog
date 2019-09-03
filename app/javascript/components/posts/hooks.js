import { useState } from 'react'
import axios from 'axios'
import objectToFormData from 'object-to-formdata'

export const useFetchAll = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})
    const [errors, setErrors] = useState({})

    const fetchAll = (page) => {
        setLoading(true)
        axios({
            method: 'get',
            url: '/api/v1/posts',
            params: { page: page }
        }).then(response => {
            const { data } = response.data
            setData(data)
            setLoading(false)
        }).catch(error => {
            const { errors } = error.response.data
            setErrors(errors)
            setLoading(false)
        })
    }

    return [data, fetchAll, loading, errors]
}

export const useFetch = (id) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})
    const [errors, setErrors] = useState({})

    const fetch = () => {
        setLoading(true)
        axios({
            method: 'get',
            url: `/api/v1/posts/${id}`
        }).then(response => {
            const { data } = response.data
            setData(data)
            setLoading(false)
        }).catch(error => {
            const { errors } = error.response.data
            setErrors(errors)
            setLoading(false)
        })
    }

    return [data, fetch, loading, errors]
}

export const useCreate = () => {
    const [data, _setData] = useState({})
    const [redirect, setRedirect] = useState(false)
    const [errors, setErrors] = useState({})

    const create = (params) => {
        axios({
            method: 'post',
            url: '/api/v1/posts',
            data: objectToFormData(params),
            headers: { 'content-type': 'multipart/form-data' }
        }).then(() => {
            setRedirect(true)
        }).catch(error => {
            const { errors } = error.response.data
            setErrors(errors)
        })
    }

    return [data, create, redirect, errors]
}

export const useUpdate = (id) => {
    const [data, _setData] = useState({})
    const [redirect, setRedirect] = useState(false)
    const [errors, _setErrors] = useState({})

    const update = (params) => {
        axios({
            method: 'put',
            url: `/api/v1/posts/${id}`,
            data: objectToFormData(params),
            headers: { 'content-type': 'multipart/form-data' }
        }).then(() => {
            setRedirect(true)
        }).catch(error => {
            const { _errors } = error.response.data
            // setErrors(errors)
        })
    }

    return [data, update, redirect, errors]
}

export const useDestroy = (id) => {
    const [redirect, setRedirect] = useState(false)
    const [errors, setErrors] = useState({})

    const destroy = () => {
        axios({
            method: 'delete',
            url: `/api/v1/posts/${id}`
        }).then(() => {
            setRedirect(true)
        }).catch(error => {
            const { errors } = error.response.data
            setErrors(errors)
        })
    }

    return [destroy, redirect, errors]
}

export default useFetch
