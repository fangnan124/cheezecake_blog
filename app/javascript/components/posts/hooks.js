import { useState } from 'react'
import axios from 'axios'
import objectToFormData from 'object-to-formdata'

const resourcesUrl = '/api/v1/posts'

export const useFetchAll = () => {
    const [data, setData] = useState({})
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(true)

    const fetchAll = (page) => {
        setLoading(true)
        axios({
            method: 'get',
            url: resourcesUrl,
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
    // const [httpStatus, setHttpStatus] = useState({})
    const [loading, setLoading] = useState(true)

    const fetch = () => {
        setLoading(true)
        axios({
            method: 'get',
            url: `${resourcesUrl}/${id}`
        }).then(response => {
            const { data } = response.data
            setData(data)
        }).catch(error => {
            // setHttpStatus(error.response.status)
            const { errors } = error.response.data
            setErrors(errors)
        }).finally(() => {
            setLoading(false)
        })
    }

    return [{ data, errors, loading }, fetch]
}

export const useCreate = () => {
    const [data, _setData] = useState({})
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [redirect, setRedirect] = useState(false)

    const create = (params) => {
        setLoading(true)
        axios({
            method: 'post',
            url: resourcesUrl,
            data: objectToFormData(params),
            headers: { 'content-type': 'multipart/form-data' }
        }).then(() => {
            setRedirect(true)
        }).catch(error => {
            const { errors } = error.response.data
            setErrors(errors)
        }).finally(() => {
            setLoading(false)
        })
    }

    return [{ data, errors, loading, redirect }, create]
}

export const useUpdate = (id) => {
    const [data, _setData] = useState({})
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [redirect, setRedirect] = useState(false)

    const update = (params) => {
        setLoading(true)
        axios({
            method: 'put',
            url: `${resourcesUrl}/${id}`,
            data: objectToFormData(params),
            headers: { 'content-type': 'multipart/form-data' }
        }).then(() => {
            setRedirect(true)
        }).catch(error => {
            const { errors } = error.response.data
            setErrors(errors)
        }).finally(() => {
            setLoading(false)
        })
    }

    return [{ data, errors, loading, redirect }, update]
}

export const useDestroy = (id) => {
    const [data, _setData] = useState({})
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [redirect, setRedirect] = useState(false)

    const destroy = () => {
        setLoading(true)
        axios({
            method: 'delete',
            url: `${resourcesUrl}/${id}`
        }).then(() => {
            setRedirect(true)
        }).catch(error => {
            const { errors } = error.response.data
            setErrors(errors)
        }).finally(() => {
            setLoading(false)
        })
    }

    return [{ data, errors, loading, redirect }, destroy]
}
