/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Loader from './loader';

const SuperPrivateRoute = ({
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
            if (!loading && user.access !== 'superadmin') {
                // eslint-disable-next-line no-alert
                alert('Whoops!! You are not allowed access to this page');
                return <Redirect to="/profile" />;
            }
            return <Component {...props} />;
        }}
    />
);
SuperPrivateRoute.propTypes = {
    auth: PropTypes.oneOfType([PropTypes.object]).isRequired,
    component: PropTypes.element.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(SuperPrivateRoute);
