import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import { connect } from 'react-redux';
import { login } from '../actions/auth';

import BackgroundImage from '../static/images/adminBackCrop.png';

import SubHeader from '../components/layout/subHeader';
import Alert from '../components/alert';
import Loader from '../components/loader';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'space-between',
    },
    bgContainer: {
        backgroundImage: `url(${BackgroundImage})`,
        backgroundPosition: '0px 130px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        position: 'absolute',
        width: '100%',
        height: 'calc(100% - 65px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    page: {
        padding: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: theme.palette.secondary.main,
        borderRadius: '10px',
    },
    formContainer: {
        marginBottom: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        width: '350px',
        padding: theme.spacing(4),
        paddingLeft: theme.spacing(6),
        paddingRight: theme.spacing(6),
        backgroundColor: 'rgba(250, 250, 250, 0.5)',
        borderRadius: '10px',
        '& > *': {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    },
    transparent: {
        borderRadius: '10px',
        backgroundColor: 'transparent',
    },
    loginButton: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(6),
        paddingRight: theme.spacing(6),

        '&:hover': {
            backgroundColor: '#ac3745',
        },
    },
}));

const Admin = (props) => {
    const classes = useStyles();

    const [state, setState] = useState({
        username: '',
        password: '',
    });
    const [status, setStatus] = useState(false);
    const { message, severity, redirect, loading } = props;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setStatus(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { username, password } = state;
        const loginDetails = {
            username,
            password,
        };
        const { loginAction } = props;
        loginAction(loginDetails);
        setStatus(true);
    };

    const handleChange = (event) => {
        const { type, value } = event.target;
        if (type === 'text') {
            setState({ ...state, username: value });
        } else if (type === 'password') {
            setState({ ...state, password: value });
        }
    };
    if (loading) {
        return <Loader />;
    }
    if (redirect) {
        return <Redirect to="/profile" />;
    }
    return (
        <section className={classes.root}>
            <SubHeader title="Login" />
            <div className={classes.bgContainer}>
                <Paper elevation={5} className={classes.transparent}>
                    <form className={classes.page} onSubmit={handleSubmit}>
                        <div className={classes.formContainer}>
                            <TextField
                                required
                                label="Username:"
                                variant="outlined"
                                onChange={handleChange}
                            />
                            <TextField
                                required
                                type="password"
                                label="Password:"
                                variant="outlined"
                                onChange={handleChange}
                            />
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.loginButton}
                            type="submit"
                        >
                            Login
                        </Button>
                    </form>
                </Paper>
            </div>
            <Alert
                status={status}
                message={message}
                severity={severity}
                handleClose={handleClose}
            />
        </section>
    );
};

Admin.propTypes = {
    loginAction: PropTypes.func.isRequired,
    redirect: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    message: PropTypes.string,
    severity: PropTypes.string,
};

Admin.defaultProps = {
    message: 'Whoops, An eror occurred',
    severity: 'warning',
};

const mapStateToProps = (state) => {
    const { alert, auth } = state;
    const { message, severity } = alert;
    const { token, user, loading } = auth;
    let redirect = false;
    if (token !== null && user !== null) {
        redirect = true;
    }
    return {
        message,
        severity,
        redirect,
        loading,
    };
};

export default connect(mapStateToProps, { loginAction: login })(Admin);
