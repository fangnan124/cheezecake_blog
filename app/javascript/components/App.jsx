import React from "react";
import Posts from "./posts/Posts";
import Post from "./posts/Post";
import New from "./posts/New";
import Edit from "./posts/Edit";
import { Switch, Route } from "react-router-dom";

class App extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Posts}/>
                <Route exact path="/posts" component={Posts}/>
                <Route exact path="/posts/new" component={New}/>
                <Route exact path="/posts/:id" component={Post}/>
                <Route exact path="/posts/:id/edit" component={Edit}/>
            </Switch>
        );
    }
}

export default App;