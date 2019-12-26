import axios from 'axios'
import ServerAccessModel from './server_access_model'
import objectToFormData from 'object-to-formdata'

class Post extends ServerAccessModel {
    // The Proxy object is used to define custom behavior for fundamental operations
    // (e.g. property lookup, assignment, enumeration, function invocation, etc).
    //
    // Post.resolved.find({ id: 1 }) -> { status: .., data: .., errors: .. }
    static resolved = new Proxy(this, {
        get: function(target, name) {
            return async (params) => {
                let data = {}
                await target[name](params)
                    .then(response => {
                        data = response.data
                    }).catch(error => {
                        data = error.response.data
                    })
                return data
            }
        }
    })

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

export default Post
