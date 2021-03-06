import React from 'react'
import ErrorPage from 'next/error'
export default Component => {
    return class WithError extends React.Component {
        static async getInitialProps(ctx) {
            // const props = (Component.getInitialProps ? await Component.getInitialProps(ctx) : null) || {}
            // if (props.statusCode && ctx.res) {
            //     ctx.res.statusCode = props.statusCode
            // }

            return (Component.getInitialProps ? await Component.getInitialProps(ctx) : null) || {}
        }
        render() {
            if (this.props.status) return <ErrorPage statusCode={this.props.status} title={this.props.status_title}/>
            return <Component {...this.props} />
        }
    }
}