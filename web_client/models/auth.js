import axios from 'axios'
import ServerAccessModel from './server_access_model'

class Auth extends ServerAccessModel {
    static sign_in = ({ email, password }) => (
        axios({
            method: 'post',
            url: `${this.base_url}/auth/sign_in`,
            data: {
                email,
                password
            }
        })
    )

    static sign_out = () => (
        axios({
            method: 'delete',
            url: `${this.base_url}/auth/sign_out`,
            headers: this.authHeaders()
        })
    )

    static sing_up = ({ params }) => (
        axios({
            method: 'post',
            url: `${this.base_url}/auth`,
            data: params
        })
    )

    static validate_token = () => (
        axios({
            method: 'get',
            url: `${this.base_url}/auth/validate_token`,
            headers: this.authHeaders()
        })
    )
}

export default Auth
