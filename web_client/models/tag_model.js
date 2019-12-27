import axios from 'axios'
import ServerAccessModel from './server_access_model'

class TagModel extends ServerAccessModel {
    static resolved = super.resolved(this)

    static all = () => (
        axios({
            method: 'get',
            url: `${this.api_url}/tags`,
            headers: this.authHeaders()
        })
    )

    static find = ({ id }) => (
        axios({
            method: 'get',
            url: `${this.api_url}/tags/${id}`,
            headers: this.authHeaders()
        })
    )

    static new = () => (
        axios({
            method: 'get',
            url: `${this.api_url}/tags/new`,
            headers: this.authHeaders()
        })
    )

    static create = ({ params }) => (
        axios({
            method: 'post',
            url: `${this.api_url}/tags`,
            data: params,
            headers: this.authHeaders()
        })
    )

    static update = ({ id, params }) => (
        axios({
            method: 'put',
            url: `${this.api_url}/tags/${id}`,
            data: params,
            headers: this.authHeaders()
        })
    )

    // static destroy = async ({ id }) => {
    //
    // }
}

export default TagModel
