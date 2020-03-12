import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './login/login';
import Home from './home/home'


class App extends Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/home" component={Home} />
                </Switch>
            </Fragment>
        )
    }
}

export default App;
