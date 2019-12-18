import { Cookies } from 'react-cookie'

class ServerAccessModel {
    static cookies;
    static setCookies = context => {
        this.cookies = context.req ? new Cookies(context.req.headers.cookie) : new Cookies()
    }

    static getCookies = () => {
        return this.cookies || new Cookies()
    }

    static authHeaders = () => {
        return {
            'access-token': this.getCookies().get('access-token') || '',
            'client': this.getCookies().get('client') || '',
            'uid': this.getCookies().get('uid') || ''
        }
    }

    static prefix = () => {
        return process.browser ? process.env.api_prefix : 'http://web:3000/api/v1'
    }
}

export default ServerAccessModel
