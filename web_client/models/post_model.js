import axios from 'axios'
import ServerAccessModel from './server_access_model'
import objectToFormData from 'object-to-formdata'

class PostModel extends ServerAccessModel {
    static resolved = super.resolved(this)

    static all = ({ page }) => (
        axios({
            method: 'get',
            url: `${this.api_url}/posts`,
            params: {
                page
            },
            headers: this.authHeaders()
        })
    )

    static find = ({ id }) => (
        axios({
            method: 'get',
            url: `${this.api_url}/posts/${id}`,
            headers: this.authHeaders()
        })
    )

    static new = () => (
        axios({
            method: 'get',
            url: `${this.api_url}/posts/new`,
            headers: this.authHeaders()
        })
    )

    static create = ({ params }) => (
        axios({
            method: 'post',
            url: `${this.api_url}/posts`,
            data: objectToFormData(params),
            headers: { 'content-type': 'multipart/form-data', ...this.authHeaders() }
        })
    )

    static update = ({ id, params }) => (
        axios({
            method: 'put',
            url: `${this.api_url}/posts/${id}`,
            data: objectToFormData(params),
            headers: { 'content-type': 'multipart/form-data', ...this.authHeaders() }
        })
    )

    // static destroy = async ({ id }) => {
    //
    // }
}

export default PostModel
