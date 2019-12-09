import axios from 'axios'
import ServerAccessModel from './server_access_model'
import objectToFormData from 'object-to-formdata'

class Post extends ServerAccessModel {
    static resolved = {
        all: async (params) => {
            let data = {}
            await this.all(params)
                .then(response => {
                    data = response.data
                }).catch(error => {
                    data = error.response.data
                })
            return data
        },
        find: async (params) => {
            let data = {}
            await this.find(params)
                .then(response => {
                    data = response.data
                }).catch(error => {
                    data = error.response.data
            })
            return data
        }
    }

    static all = ({ page }) => (
        axios({
            method: 'get',
            url: `${this.prefix()}/posts`,
            params: {
                page
            },
            headers: this.authHeaders()
        })
    )

    static find = ({ id }) => (
        axios({
            method: 'get',
            url: `${this.prefix()}/posts/${id}`,
            headers: this.authHeaders()
        })
    )

    static create = async ({ params }) => {
        let resolve = {}

        await axios({
            method: 'post',
            url: `${this.prefix()}/posts`,
            data: objectToFormData(params),
            headers: { 'content-type': 'multipart/form-data', ...this.authHeaders() }
        }).then(response => {
            resolve = response.data
        }).catch(error => {
            resolve = error.response.data
        })

        return resolve
    }

    static update = async ({ params }) => {

    }

    static destroy = async ({ id }) => {

    }
}

export default Post
