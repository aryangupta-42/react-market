/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Loader from './loader';

const PrivateRoute = ({
    component: Component,
    auth: { user, loading },
    ...rest
}) => (
    <Route
        {...rest}
        render={(props) => {
            if (loading) {
                return <Loader />;
            }
            if (!loading && user === null) {
                return <Redirect to="/admin" />;
            }
            return <Component {...props} />;
        }}
    />
);
PrivateRoute.propTypes = {
    auth: PropTypes.oneOfType([PropTypes.object]).isRequired,
    component: PropTypes.element.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
