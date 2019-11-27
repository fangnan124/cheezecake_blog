import React, {useState, useEffect} from 'react'
import { Button, Icon, Grid, Modal } from 'semantic-ui-react'
import axios from 'axios'
import Tag from 'components/tag'
import New from './new'
import Edit from './Edit'

const Index = () => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        fetch()
    }, [])

    const fetch = () => {
        setLoading(true)
        axios({
            method: 'get',
            url: `${process.env.api_prefix}/tags`
        }).then(response => {
            const { data } = response.data
            setData(data)
        }).catch(error => {
            const { errors } = error.response.data
        }).finally(() => {
            setLoading(false)
        })
    }

    const destroy = (id) => {
        setLoading(true)
        axios({
            method: 'delete',
            url: `${process.env.api_prefix}/tags/${id}`
        }).then(response => {
            const { data } = response.data
            setData(data)
        }).catch(error => {
            const { errors } = error.response.data
        }).finally(() => {
            setLoading(false)
        })
    }

    if (loading) return null
    return (
        <Grid>
            {
                data.tags.map(tag => (
                    <Grid.Column key={tag.id} mobile={16} tablet={8} computer={4}>
                        <Tag
                            key={tag.id}
                            label={tag.name}
                            color={tag.color}
                        />
                        <span style={{ marginLeft: 5 }}>
                            <Modal trigger={<Icon name='edit outline' style={{ cursor: 'pointer' }}/>} size={'mini'}>
                                <Modal.Header>Edit</Modal.Header>
                                <Modal.Content>
                                    <Edit onSuccess={fetch} id={tag.id}/>
                                </Modal.Content>
                            </Modal>
                            <Modal trigger={<Icon name='remove' style={{ cursor: 'pointer' }}/>} size={'mini'}>
                                <Modal.Header>Delete</Modal.Header>
                                <Modal.Content>
                                    <p>Are you sure?</p>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color='red' icon='delete' labelPosition='right' content='Delete' onClick={() => destroy(tag.id)}/>
                                </Modal.Actions>
                            </Modal>
                        </span>
                    </Grid.Column>
                ))
            }
            <Grid.Column width={16}>
                <Modal trigger={<Icon name='add' style={{ cursor: 'pointer' }}/>} size={'mini'}>
                    <Modal.Header>New</Modal.Header>
                    <Modal.Content>
                        <New onSuccess={fetch}/>
                    </Modal.Content>
                </Modal>
            </Grid.Column>
        </Grid>
    )
}

export default Index
