import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function (WrappedComponent, toHomepage = '/') {
    class Reroute extends Component {
        componentDidMount() {
            this.checkLoggedIn()
        }
         componentDidUpdate() {
            this.checkLoggedIn()
        }
         checkLoggedIn() {
            if (this.props.loggedIn == false) {
               this.props.history.push(toHomepage);
            }
        }
         render() {
            return <WrappedComponent {...this.props} />
        }
    }

    function mapStateToProps(state) {
        return {
           loggedIn: state.login.loggedIn
        }
     }

    return connect(mapStateToProps)(Reroute)
}