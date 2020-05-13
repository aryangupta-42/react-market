/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function CustomizedSnackbars(props) {
    const classes = useStyles();

    const { status, message, severity, handleClose } = props;

    const horizontal = 'left';
    const vertical = 'bottom';

    const [open, setOpen] = useState(false);

    React.useEffect(() => {
        setOpen(status);
    }, [status]);

    return (
        <div className={classes.root}>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical, horizontal }}
                key={`${vertical},${horizontal}`}
            >
                <Alert onClose={handleClose} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}

CustomizedSnackbars.propTypes = {
    status: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    message: PropTypes.string,
    severity: PropTypes.string,
};

CustomizedSnackbars.defaultProps = {
    severity: 'warning',
    message: 'Whoops!! Something went wrong',
};
