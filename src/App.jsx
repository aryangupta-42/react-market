import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

import { connect } from 'react-redux';
import { loadUser } from './actions/auth';

import PrivateRoute from './components/privateRoute';
import SuperPrivateRoute from './components/superPrivateRoute';
import Header from './components/layout/header';
import Loader from './components/loader';
import Landing from './pages/landing';
import About from './pages/about';
import Admin from './pages/admin';
import Cart from './pages/cart';
import Profile from './pages/profile';
import AddUser from './pages/addUser';
import RemoveUser from './pages/removeUser';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
}));

const App = (props) => {
    const classes = useStyles();
    const { loading } = props;
    useEffect(() => {
        const { loadUserAction } = props;
        loadUserAction();
    }, []);

    if (loading) {
        return <Loader />;
    }
    return (
        <Router>
            <div className={classes.root}>
                <Header />
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route path="/about" component={About} />
                    <Route private path="/admin" component={Admin} />
                    <PrivateRoute path="/cart" component={Cart} />
                    <PrivateRoute path="/profile" component={Profile} />
                    <SuperPrivateRoute path="/addUser" component={AddUser} />
                    <SuperPrivateRoute
                        path="/removeUser"
                        component={RemoveUser}
                    />
                </Switch>
            </div>
        </Router>
    );
};

App.propTypes = {
    loadUserAction: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    const { auth } = state;
    const { loading } = auth;
    return {
        loading,
    };
};

export default connect(mapStateToProps, { loadUserAction: loadUser })(App);
