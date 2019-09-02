import React from 'react'
import Index from './posts/Index'
import Show from './posts/Show'
import New from './posts/New'
import Edit from './posts/Edit'
import Login from './auth/Login'
import SignUp from './auth/SignUp'
import ProfileIndex from './profile/Index'
import AdminIndex from './admin/Index'
import { Switch, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import PrivateRoute from './PrivateRoute'

class Main extends React.Component {
    render() {
        return (
            <Container text style={{ margin: '3em 0' }}>
                <Switch>
                    <Route exact path="/sign_up" component={SignUp}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/" component={() => <Index/>}/>
                    <Route exact path="/posts" component={Index}/>
                    <PrivateRoute exact path="/posts/new" component={New}/>
                    <Route exact path="/posts/:id" component={Show}/>
                    <PrivateRoute exact path="/posts/:id/edit" component={Edit}/>
                    <PrivateRoute exact path="/profile" component={ProfileIndex}/>
                    <PrivateRoute exact path="/admin" component={AdminIndex}/>
                </Switch>
            </Container>
        )
    }
}

export default Main