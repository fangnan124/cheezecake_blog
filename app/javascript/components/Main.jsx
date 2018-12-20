import React from 'react'
import Index from './posts/Index'
import Show from './posts/Show'
import New from './posts/New'
import Edit from './posts/Edit'
import Login from './auth/Login'
import { Switch, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import PrivateRoute from './PrivateRoute'

class Main extends React.Component {
    render() {
        return (
            <Container text style={{ marginTop: '5em' }}>
                <Switch>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/posts" component={Index}/>
                    <PrivateRoute exact path="/posts/new" component={New}/>
                    <Route exact path="/posts/:id" component={Show}/>
                    <PrivateRoute exact path="/posts/:id/edit" component={Edit}/>
                    <Route exact path="/" component={Index}/>
                </Switch>
            </Container>
        )
    }
}

export default Main