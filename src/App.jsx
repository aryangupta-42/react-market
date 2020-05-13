import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { loadUser } from './actions/auth';

import Header from './components/layout/header';
import PrivateRoute from './components/privateRoute';
import Loader from './components/loader';
import Landing from './pages/landing';
import About from './pages/about';
import Cart from './pages/cart';
import Profile from './pages/profile';
import Admin from './pages/admin';

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
                    <PrivateRoute path="/cart" component={Cart} />
                    <PrivateRoute path="/profile" component={Profile} />
                    <Route private path="/admin" component={Admin} />
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
