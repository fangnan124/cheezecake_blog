import axios from 'axios'

export const findAll = async ({ cookies, page }) => {
    let resolve = {
        data: {},
        errors: {}
    }

    let prefix = ''
    if (process.browser) {
        prefix = process.env.api_prefix
    } else {
        prefix = 'http://web:3000/api/v1'
    }

    await axios({
        method: 'get',
        url: `${prefix}/posts`,
        params: {
            page
        },
        headers: {
            'access-token': cookies['access-token'] || '',
            'client': cookies['client'] || '',
            'uid': cookies['uid'] || ''
        }
    }).then(response => {
        const { data } = response.data
        resolve.data = data
    }).catch(error => {
        console.log(error)
        const { errors } = error.response.data
        resolve.errors = errors
    })

    return resolve
}

export const find = async ({ id, cookies }) => {
    let resolve = {
        data: {},
        errors: {}
    }

    let prefix = ''
    if (process.browser) {
        prefix = process.env.api_prefix
    } else {
        prefix = 'http://web:3000/api/v1'
    }

    await axios({
        method: 'get',
        url: `${prefix}/posts/${id}`,
        headers: {
            'access-token': cookies['access-token'],
            'client': cookies['client'],
            'uid': cookies['uid']
        }
    }).then(response => {
        const { data } = response.data
        resolve.data = data
    }).catch(error => {
        console.log(error)
        const { errors } = error.response.data
        resolve.errors = errors
    })

    return resolve
}

export default { find, findAll }
