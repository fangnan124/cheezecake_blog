import React from 'react'
import axios from 'axios'
import {Header, Icon, Button, Comment, Form} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import Tag from 'components/Tag'
import Comments from './Comments'

class Show extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            errors: {},
            loading: true
        }
    }

    componentDidMount() {
        this.setState({ loading: true })
        axios({
            method: 'get',
            url: `/api/v1/posts/${this.props.match.params.id}`
        }).then(response => {
            const { data } = response.data
            this.setState({ data, loading: false })
        }).catch(error => {
            const { errors } = error.response.data
            this.setState({ errors, loading: false })
        })
    }

    render() {
        const { post } = this.state.data
        if (this.state.loading) return null
        return (
            <div>
                <Header as='h1'>{post.title}</Header>
                {
                    post.tags.map(tag => <Tag key={tag.id} label={tag.name} color={tag.color}/>)
                }
                <div style={{ float: 'right' }}>
                    <Link to={`/posts/${post.id}/edit`}>
                        <Icon name='edit outline'/>
                    </Link>
                </div>
                <div style={{ margin: '30px 0' }} dangerouslySetInnerHTML={{ __html: post.content }}/>
                <Comments postId={post.id}/>
            </div>
        )
    }
}

export default Show