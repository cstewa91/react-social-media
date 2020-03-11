import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './login/login';


class App extends Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    <Route exact path="/" component={Login} />
                </Switch>
            </Fragment>
        )
    }
}

export default App;
