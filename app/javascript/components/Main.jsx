import React from "react";
import Index from "./posts/Index";
import Show from "./posts/Show";
import New from "./posts/New";
import Edit from "./posts/Edit";
import { Switch, Route } from "react-router-dom";
import { Container } from 'semantic-ui-react';

class Main extends React.Component {
    render() {
        return (
            <Container text style={{ marginTop: '3.5em' }}>
                <Switch>
                    <Route exact path="/" component={Index}/>
                    <Route exact path="/posts" component={Index}/>
                    <Route exact path="/posts/new" component={New}/>
                    <Route exact path="/posts/:id" component={Show}/>
                    <Route exact path="/posts/:id/edit" component={Edit}/>
                </Switch>
            </Container>
        );
    }
}

export default Main;