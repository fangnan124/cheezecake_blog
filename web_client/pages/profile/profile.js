import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {Form} from 'semantic-ui-react'
import UserContext from 'contexts/user_context'

const Profile = () => {
    const { user, setUser } = useContext(UserContext)
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [_errors, setErrors] = useState(true)

    useEffect(() => {
        setLoading(true)
        axios({
            method: 'get',
            url: `${process.env.api_prefix}/users/${user.id}`
        }).then(response => {
            const { data } = response.data
            setData(data)
        }).catch(error => {
            const { errors } = error.response.data
            setErrors(errors)
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    const update = (event) => {
        event.preventDefault()
        setLoading(true)
        axios({
            method: 'put',
            url: `/api/v1/users/${user.id}`,
            data: { user: { name: data.user.name } }
        }).then(response => {
            const { data } = response.data
            setUser(data.user)
        }).catch(error => {
            const { errors } = error.response.data
            setErrors(errors)
        }).finally(() => {
            setLoading(false)
        })
    }

    if (loading) return null
    return (
        <Form onSubmit={update}>
            <Form.Field>
                <label>Name</label>
                <input
                    type="text"
                    value={data.user.name}
                    onChange={e => {
                        const newData = Object.assign({}, data)
                        newData.user.name = e.target.value
                        setData(newData)
                    }}
                />
            </Form.Field>
            <Form.Button content='Save' labelPosition='left' icon='edit' primary/>
        </Form>
    )
}

export default Profile
