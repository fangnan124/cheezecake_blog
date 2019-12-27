import { useState } from 'react'
import axios from 'axios'
import Router from 'next/router'
import objectToFormData from 'object-to-formdata'
import PostModel from 'models/post_model'

// export const useFetchAll = () => {
//     const [data, setData] = useState({})
//     const [errors, setErrors] = useState({})
//     const [loading, setLoading] = useState(true)
//
//     const fetchAll = (page) => {
//         setLoading(true)
//         axios({
//             method: 'get',
//             url: `${process.env.api_prefix}/posts`,
//             params: { page: page }
//         }).then(response => {
//             const { data } = response.data
//             setData(data)
//         }).catch(error => {
//             const { errors } = error.response.data
//             setErrors(errors)
//         }).finally(() => {
//             setLoading(false)
//         })
//     }
//
//     return [{ data, errors, loading }, fetchAll]
// }
//
// export const useFetch = (id) => {
//     const [data, setData] = useState({})
//     const [errors, setErrors] = useState({})
//     const [loading, setLoading] = useState(true)
//
//     const fetch = () => {
//         setLoading(true)
//         axios({
//             method: 'get',
//             url: `${process.env.api_prefix}/posts/${id}`
//         }).then(response => {
//             const { data } = response.data
//             setData(data)
//             setLoading(false)
//         }).catch(error => {
//             // setHttpStatus(error.response.status)
//             const { errors } = error.response.data
//             setErrors(errors)
//             setLoading(false)
//         })
//     }
//
//     return [{ data, errors, loading }, fetch]
// }

// export const useCreate = () => {
//     const [errors, setErrors] = useState({})
//     const [loading, setLoading] = useState(false)
//
//     const create = (params) => {
//         setLoading(true)
//         axios({
//             method: 'post',
//             url: `${process.env.api_prefix}/posts`,
//             data: objectToFormData(params),
//             headers: { 'content-type': 'multipart/form-data' }
//         }).then(() => {
//             Router.push('/posts')
//         }).catch(error => {
//             const { errors } = error.response.data
//             console.log(errors)
//             setErrors(errors)
//         }).finally(() => {
//             setLoading(false)
//         })
//     }
//
//     return [{ errors, loading }, create]
// }

export const useCreate = () => {
    const [data, setData] = useState({ meta: {}, data: {}, errors: {} })

    const create = (params) => {
        PostModel.create({ params })
            .then(data => setData(data))
    }

    return [data, create]
}

export const useUpdate = (id) => {
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const update = (params) => {
        setLoading(true)
        axios({
            method: 'put',
            url: `${process.env.api_prefix}/posts/${id}`,
            data: objectToFormData(params),
            headers: { 'content-type': 'multipart/form-data' }
        }).then(() => {
            Router.push('/posts')
        }).catch(error => {
            const { errors } = error.response.data
            setErrors(errors)
        }).finally(() => {
            setLoading(false)
        })
    }

    return [{ errors, loading }, update]
}

export const useDestroy = (id) => {
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const destroy = () => {
        setLoading(true)
        axios({
            method: 'delete',
            url: `${process.env.api_prefix}/posts/${id}`
        }).then(() => {
            Router.push('/posts')
        }).catch(error => {
            const { errors } = error.response.data
            setErrors(errors)
        }).finally(() => {
            setLoading(false)
        })
    }

    return [{ errors, loading }, destroy]
}

export default { useCreate, useUpdate, useDestroy }
