import axios from 'axios'
import BaseModel from "./base_model";
import objectToFormData from "object-to-formdata";
import Router from "next/router";

class Posts extends BaseModel {
    static all = async ({ page }) => {
        let resolve = {}

        await axios({
            method: 'get',
            url: `${this.prefix()}/posts`,
            params: {
                page
            },
            headers: this.authHeaders()
        }).then(response => {
            resolve = response.data
        }).catch(error => {
            resolve = error.response.data
        })

        return resolve
    }

    static find = async ({ id }) => {
        let resolve = {}

        await axios({
            method: 'get',
            url: `${this.prefix()}/posts/${id}`,
            headers: this.authHeaders()
        }).then(response => {
            resolve = response.data
        }).catch(error => {
            resolve = error.response.data
        })

        return resolve
    }

    static create = async ({ params }) => {
        await axios({
            method: 'post',
            url: `${process.env.api_prefix}/posts`,
            data: objectToFormData(params),
            headers: { 'content-type': 'multipart/form-data' }
        }).then(() => {
            Router.push('/posts')
        }).catch(error => {
            const { errors } = error.response.data
            console.log(errors)
            setErrors(errors)
        }).finally(() => {
            setLoading(false)
        })
    }

    static update = async ({ params }) => {

    }

    static destroy = async ({ id }) => {

    }
}

export default Posts
