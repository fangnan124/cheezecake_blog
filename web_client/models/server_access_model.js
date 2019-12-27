import { Cookies } from 'react-cookie'

/**
 * Let me call it `ServerAccessModel` for now.
 * Put all ajax requests in models. which always extends ServerAccessModel(treat this as a base model).
 */
class ServerAccessModel {
    static model;
    constructor(props) {
        this.model = props.model
    }

    /**
     * Almost every http request from our client are requiring cookies.
     * We store 'access-token', 'client', 'uid' in cookies.
     *   - what is 'access-token', 'client', 'uid'? :
     *       these keywords work with gem 'devise_token_auth',
     *       if you use jwt or something else, the keywords may different.
     *   - why not store in localStorage? :
     *       when you type url in browser directly and visit any page,
     *       on the first page load, only the cookies will be sent by the http request.
     *       localStorage does not have chance to be accessed.
     *       so, if you store tokens in localStorage, you cannot get tokens on the first page load.
     */
    static cookies;

    /**
     * setCookies is supposed to be only called in `getInitialProps`
     * since it's a universal application, getInitialProps will be executed on both frontend and backend,
     * when it's on backend, the cookies can only be retrieved from context(request).
     *   - context.req ? :
     *       true(defined): backend | false(undefined): frontend
     *   - new Cookies(context.req.headers.cookie) ? :
     *       cookies from context.
     *   - new Cookies() ? :
     *       cookies from browser.
     *
     * @param context {Object} context from getInitialProps
     */
    static setCookies = context => {
        this.cookies = context.req ? new Cookies(context.req.headers.cookie) : new Cookies()
    }

    /**
     * Get cookies properly.
     *
     * @returns {Cookies}
     */
    static getCookies = () => {
        return this.cookies || new Cookies()
    }

    /**
     * All headers about authentication, use or merge this to your ajax request header.
     *
     * @returns {{uid: (string), client: (string), "access-token": (string)}}
     */
    static authHeaders = () => {
        return {
            'access-token': this.getCookies().get('access-token') || '',
            'client': this.getCookies().get('client') || '',
            'uid': this.getCookies().get('uid') || ''
        }
    }

    static base_url = process.browser ? process.env.base_url : process.env.dev_base_url
    static api_url = process.browser ? process.env.api_url : process.env.dev_api_url

    /**
     * TODO
     *
     * The Proxy object is used to define custom behavior for fundamental operations
     * (e.g. property lookup, assignment, enumeration, function invocation, etc).
     *
     * Usage:
     *   Post.resolved.find({ id: 1 }) ---> ({ status: .., data: .., errors: .. })
     */
    static resolved = (context) => new Proxy(context, {
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
}

export default ServerAccessModel
