import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    makeStyles,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Button,
    Typography,
} from '@material-ui/core';

import { connect } from 'react-redux';
import { register } from '../actions/admin';
import Animate from '../components/animate';

import SubHeader from '../components/layout/subHeader';
import Alert from '../components/alert';
import Loader from '../components/loader';

const useStyles = makeStyles((theme) => ({
    rootContainer: {
        height: 'auto',
        padding: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        marginTop: theme.spacing(4),
        textAlign: 'center',
        fontWeight: 100,
    },
    formContainer: {
        width: '50%',
        minWidth: '400px',
        padding: theme.spacing(4),
        margin: 'auto',
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    inputRow: {
        width: '95%',
    },
    inputHalf1: {
        width: '49%',
        float: 'left',
    },
    inputHalf2: {
        width: '49%',
        float: 'right',
    },
    input: {
        width: '95%',
        marginTop: theme.spacing(2),
    },
    submitBtn: {
        marginTop: theme.spacing(3),

        '&:hover': {
            backgroundColor: '#ac3745',
        },
    },
}));

const AddUser = (props) => {
    const { loading, registerAction } = props;

    const classes = useStyles();

    const [state, setState] = useState({
        name: '',
        username: '',
        password: '',
        access: '',
    });

    const { message, severity } = props;

    const [alert, setAlert] = useState({
        alertSeverity: severity,
        alertMessage: message,
        status: false,
    });

    useEffect(() => {
        if (message !== '') {
            setAlert({
                alertMessage: message,
                alertSeverity: severity,
                status: true,
            });
            if (severity === 'success') {
                setState({
                    name: '',
                    username: '',
                    password: '',
                    access: '',
                });
            }
        }
    }, [message, severity]);

    useEffect(() => {
        setAlert({
            ...alert,
            status: false,
        });
    }, []);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlert({
            ...alert,
            status: false,
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setState({
            ...state,
            [name]: value,
        });
    };

    const { name, access, username, password } = state;
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (
            name === '' ||
            access === '' ||
            username === '' ||
            password === ''
        ) {
            setAlert({
                alertSeverity: 'warning',
                alertMessage: "Please check you've filled all fields",
                status: true,
            });
        } else {
            registerAction(state);
            setAlert({
                ...alert,
                status: true,
            });
        }
    };

    if (loading) {
        return <Loader />;
    }

    const { alertSeverity, alertMessage, status } = alert;

    return (
        <section>
            <Animate>
                <SubHeader title="Add User" />
            </Animate>
            <div className={classes.rootContainer}>
                <Animate index={1}>
                    <Typography variant="h3" className={classes.title}>
                        Please fill out the following form...
                    </Typography>
                </Animate>
                <Animate index={2}>
                    <form onSubmit={handleSubmit}>
                        <div className={classes.formContainer}>
                            <div className={classes.inputRow}>
                                <TextField
                                    className={classes.inputHalf1}
                                    label="Name"
                                    variant="filled"
                                    name="name"
                                    onChange={handleChange}
                                    value={name}
                                    required
                                />
                                <FormControl
                                    variant="filled"
                                    className={classes.inputHalf2}
                                    required
                                >
                                    <InputLabel>Access</InputLabel>
                                    <Select
                                        value={access}
                                        onChange={handleChange}
                                        name="access"
                                    >
                                        <MenuItem value="superadmin">
                                            SuperAdmin
                                        </MenuItem>
                                        <MenuItem value="admin">Admin</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <TextField
                                className={classes.input}
                                label="Username"
                                variant="filled"
                                name="username"
                                onChange={handleChange}
                                value={username}
                                required
                            />
                            <TextField
                                className={classes.input}
                                label="Password"
                                variant="filled"
                                name="password"
                                onChange={handleChange}
                                value={password}
                                required
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.submitBtn}
                            >
                                Create!
                            </Button>
                        </div>
                    </form>
                </Animate>
            </div>
            <Alert
                status={status}
                message={alertMessage}
                severity={alertSeverity}
                handleClose={handleClose}
            />
        </section>
    );
};

AddUser.propTypes = {
    loading: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    severity: PropTypes.string.isRequired,
    registerAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    const { auth, alert } = state;
    const { message, severity } = alert;
    return {
        loading: auth.loading,
        message,
        severity,
    };
};

export default connect(mapStateToProps, { registerAction: register })(AddUser);
