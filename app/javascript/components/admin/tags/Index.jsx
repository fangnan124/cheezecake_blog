import React from 'react'
import axios from 'axios'
import {Form} from 'semantic-ui-react'
import UserContext from 'components/contexts/UserContext'
import Tag from "../../Tag"
import { Button, Icon, Grid } from 'semantic-ui-react'
import { Header, Image, Modal } from 'semantic-ui-react'
import { CompactPicker } from 'react-color'
import New from './New'
import Edit from './Edit'

class Index extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            color: '',
            data: {},
            redirect: false,
            loading: true,
            errors: {}
        }
    }

    componentDidMount() {
        this.fetch()
    }

    fetch = () => {
        this.setState({ loading: true })
        axios({
            method: 'get',
            url: '/api/v1/tags'
        }).then(response => {
            const { data } = response.data
            this.setState({ data, loading: false })
        }).catch(error => {
            const { errors } = error.response.data
            this.setState({ errors, loading: false })
        })
    }

    delete = (id) => {
        this.setState({ loading: true })
        axios({
            method: 'delete',
            url: `/api/v1/tags/${id}`
        }).then(response => {
            const { data } = response.data
            this.setState({ data, loading: false })
        }).catch(error => {
            const { errors } = error.response.data
            this.setState({ errors, loading: false })
        })
    };

    render() {
        if (this.state.loading) return null
        return (
            <Grid>
                {
                    this.state.data.tags.map(tag => {
                        return (
                            <Grid.Column key={tag.id} mobile={16} tablet={8} computer={4}>
                                <Tag
                                    key={tag.id}
                                    label={tag.name}
                                    color={tag.color}
                                />
                                <span style={{ marginLeft: 5 }}>
                                    <Modal trigger={<Icon name='edit outline'/>} size={'mini'}>
                                        <Modal.Header>Edit</Modal.Header>
                                        <Modal.Content>
                                            <Edit onSuccess={this.fetch} id={tag.id}/>
                                        </Modal.Content>
                                    </Modal>
                                    <Modal trigger={<Icon name='remove'/>} size={'mini'}>
                                        <Modal.Header>Edit</Modal.Header>
                                        <Modal.Content>
                                            <p>Are you sure?</p>
                                        </Modal.Content>
                                        <Modal.Actions>
                                            <Button negative onClick={this.close}>No</Button>
                                            <Button positive icon='checkmark' labelPosition='right' content='Yes' onClick={() => this.delete(tag.id)}/>
                                        </Modal.Actions>
                                    </Modal>
                                </span>
                            </Grid.Column>
                        )
                    })
                }
                <Grid.Column width={16}>
                    <Modal trigger={<Button primary size='mini'>Add</Button>} size={'mini'}>
                        <Modal.Header>New</Modal.Header>
                        <Modal.Content>
                            <New onSuccess={this.fetch}/>
                        </Modal.Content>
                    </Modal>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Index
