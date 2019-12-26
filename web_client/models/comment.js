import axios from 'axios'
import ServerAccessModel from './server_access_model'

class Comment extends ServerAccessModel {
    static all = ({ postId, page }) => (
        axios({
            method: 'get',
            url: `${this.api_url}/posts/${postId}/comments`,
            params: { page },
            headers: this.authHeaders()
        })
    )

    static create = ({ postId, params }) => (
        axios({
            method: 'post',
            url: `${this.api_url}/posts/${postId}/comments`,
            data: params,
            headers: this.authHeaders()
        })
    )

    static update = ({ id, params }) => (
        axios({
            method: 'put',
            url: `${this.api_url}/comments/${id}`,
            data: params,
            headers: this.authHeaders()
        })
    )

    static destroy = ({ id }) => (
        axios({
            method: 'delete',
            url: `${this.api_url}/comments/${id}`,
            headers: this.authHeaders()
        })
    )
}

export default Comment
