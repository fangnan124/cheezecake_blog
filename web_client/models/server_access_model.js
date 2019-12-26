import { Cookies } from 'react-cookie'

/**
 * Let me call it `ServerAccessModel` for now.
 * Put all ajax requests in models. which always extends ServerAccessModel(treat this as a base model).
 */
class ServerAccessModel {
    // Almost every http request from our client are requiring cookies.
    // We store 'access-token', 'client', 'uid' in cookies.
    //   - what is 'access-token', 'client', 'uid'? :
    //       these keywords work with gem 'devise_token_auth',
    //       if you use jwt or something else, the keywords may different.
    //   - why not store in localStorage? :
    //       when you type url in browser directly and visit this site,
    //       on the first page, only the cookies will sent by your request.
    //       localStorage will not have chance to be accessed.
    //       so, if you store tokens in localStorage, you cannot get tokens on the first page action.
    static cookies;

    // setCookies is supposed to be only called in `getInitialProps`
    // since it's a universal application, getInitialProps will be executed on both frontend and backend,
    // when it's on backend, the cookies can only be retrieved from context(request).
    //   - context.req ? :
    //       true(defined): backend | false(undefined): frontend
    //   - new Cookies(context.req.headers.cookie) ? :
    //       cookies from context.
    //   - new Cookies() ? :
    //       cookies from browser.
    static setCookies = context => {
        this.cookies = context.req ? new Cookies(context.req.headers.cookie) : new Cookies()
    }

    // get cookies properly.
    static getCookies = () => {
        return this.cookies || new Cookies()
    }

    // all headers about authentication, use or merge this to your ajax request header.
    static authHeaders = () => {
        return {
            'access-token': this.getCookies().get('access-token') || '',
            'client': this.getCookies().get('client') || '',
            'uid': this.getCookies().get('uid') || ''
        }
    }

    static base_url = process.browser ? process.env.base_url : process.env.dev_base_url
    static api_url = process.browser ? process.env.api_url : process.env.dev_api_url
}

export default ServerAccessModel
