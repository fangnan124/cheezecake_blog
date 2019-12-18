import axios from 'axios'
import ServerAccessModel from './server_access_model'

class Auth extends ServerAccessModel {
    static sign_in = ({ email, password }) => (
        axios({
            method: 'post',
            url: `${process.env.domain}/auth/sign_in`,
            data: {
                email,
                password
            }
        })
    )

    static sign_out = () => (
        axios({
            method: 'delete',
            url: `${process.env.domain}/auth/sign_out`,
            headers: this.authHeaders()
        })
    )

    static sing_up = ({ params }) => (
        axios({
            method: 'post',
            url: `${process.env.domain}/auth`,
            data: params
        })
    )

    static validate_token = () => (
        axios({
            method: 'get',
            url: `${process.env.domain}/auth/validate_token`,
            headers: this.authHeaders()
        })
    )
}

export default Auth
