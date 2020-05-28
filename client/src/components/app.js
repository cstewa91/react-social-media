import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './login/login';
import Home from './home/home';
import Books from './books/books';
import Clubs from './clubs/clubs';
import Events from './school-events/events';
import StudyGroups from './study-groups/study-groups';
import Header from './header/header';


class App extends Component {
    render() {
        return (
            <Fragment>
                <Header />
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/home" component={Home} />
                    <Route path='/books' component={Books} />
                    <Route path='/clubs' component={Clubs} />
                    <Route path='/events' component={Events} />
                    <Route path='/study-groups' component={StudyGroups} />
                </Switch>
            </Fragment>
        )
    }
}

export default App;
