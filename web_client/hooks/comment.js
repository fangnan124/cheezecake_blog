import { useState } from 'react'
import axios from 'axios'

const blankFunc = () => {}

export const useFetchAll = (postId) => {
    const [data, setData] = useState({ comments: [], policy: {} })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(true)

    const fetchAll = (page = 1) => {
        setLoading(true)
        axios({
            method: 'get',
            url: `${process.env.api_prefix}/posts/${postId}/comments`,
            // params: { page: page }
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

export const useCreate = (postId) => {
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const create = ({ params = {}, onSuccess = blankFunc, onFailure = blankFunc }) => {
        setLoading(true)
        axios({
            method: 'post',
            url: `${process.env.api_prefix}/posts/${postId}/comments`,
            data: params
        }).then(() => {
            onSuccess()
        }).catch(error => {
            const { errors } = error.response.data
            setErrors(errors)
            onFailure()
        }).finally(() => {
            setLoading(false)
        })
    }

    return [{ errors, loading }, create]
}

export const useUpdate = (id) => {
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const update = ({ params = {}, onSuccess = blankFunc, onFailure = blankFunc }) => {
        setLoading(true)
        axios({
            method: 'put',
            url: `${process.env.api_prefix}/comments/${id}`,
            data: params
        }).then(() => {
            onSuccess();
        }).catch(error => {
            const { errors } = error.response.data
            setErrors(errors)
            onFailure()
        }).finally(() => {
            setLoading(false)
        })
    }

    return [{ errors, setErrors, loading, setLoading }, update]
}

export const useDestroy = () => {
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const destroy = ({ id, onSuccess = blankFunc, onFailure = blankFunc }) => {
        setLoading(true)
        axios({
            method: 'delete',
            url: `${process.env.api_prefix}/comments/${id}`
        }).then(() => {
            onSuccess()
        }).catch(error => {
            const { errors } = error.response.data
            setErrors(errors)
            onFailure()
        }).finally(() => {
            setLoading(false)
        })
    }

    return [{ errors, loading }, destroy]
}

export default { useFetchAll, useCreate, useUpdate, useDestroy }
