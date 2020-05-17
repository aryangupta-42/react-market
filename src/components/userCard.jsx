import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography, Card } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { motion } from 'framer-motion';

import { connect } from 'react-redux';
import { deleteAdmin } from '../actions/admin';

import Animate from './animate';
import Alert from './alert';

const useStyles = makeStyles((theme) => ({
    userCard: {
        width: '450px',
        padding: theme.spacing(3),
        margin: theme.spacing(2),
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        display: 'flex',
        flexDirection: 'row',
    },
    userCardDetailsContainer: {
        width: '70%',
        height: 'inherit',
        // backgroundColor: 'red',
        display: 'flex',
        flexDirection: 'row',
        padding: theme.spacing(3),
    },
    userCardDetailsLine: {
        width: '5px',
        height: 'inherit',
        borderRadius: '2px',
        backgroundColor: theme.palette.primary.main,
    },
    userCardDetails: {
        width: 'auto',
        height: 'inherit',
        paddingLeft: theme.spacing(3),
    },
    userDetails: {
        margin: theme.spacing(0.5),
    },
    userCardDelete: {
        width: '30%',
        height: 'inherit',
        // backgroundColor: 'blue',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    userCardDeleteBtn: {
        width: '50px',
        height: '50px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        cursor: 'pointer',
        borderRadius: '30px',
        textAlign: 'center',
        backgroundColor: 'red',
    },
    deleteIcon: {
        fontWeight: 800,
    },
    deleteCaption: {
        fontWeight: 800,
        fontSize: '12px',
        transition: '0.2s ease-out',
    },
}));

const UserCard = (props) => {
    const {
        name,
        username,
        access,
        id,
        delay,
        deleteAdminAction,
        message,
        severity,
    } = props;
    const classes = useStyles();
    const [crossHover, setHover] = useState(false);
    const [status, setStatus] = useState(false);

    const hoverStart = () => {
        setHover(true);
    };
    const hoverEnd = () => {
        setHover(false);
    };
    const getStyle = () => {
        if (crossHover) {
            return {
                opacity: 1,
                display: 'block',
            };
        }
        return {
            opacity: 0,
            display: 'none',
        };
    };

    const handleDelete = () => {
        // eslint-disable-next-line no-alert
        const confirmation = window.confirm(
            'Are you sure you want to delete this user?'
        );
        if (confirmation) {
            deleteAdminAction(id);
            setStatus(true);
            setTimeout(() => {
                window.location.reload();
            }, 500);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setStatus(false);
    };
    return (
        <Animate index={delay}>
            <Card className={classes.userCard}>
                <div className={classes.userCardDetailsContainer}>
                    <div className={classes.userCardDetailsLine} />
                    <div className={classes.userCardDetails}>
                        <Typography
                            className={classes.userDetails}
                            variant="h4"
                        >
                            {name}
                        </Typography>
                        <Typography
                            className={classes.userDetails}
                            variant="h5"
                        >
                            {username}
                        </Typography>
                        <Typography
                            className={classes.userDetails}
                            variant="body"
                        >
                            {access}
                        </Typography>
                        <div style={{ display: 'none' }}>{id}</div>
                    </div>
                </div>
                <div className={classes.userCardDelete}>
                    <motion.div
                        className={classes.userCardDeleteBtn}
                        whileHover={{
                            width: '99%',
                            height: '90%',
                        }}
                        transition={{
                            ease: 'easeOut',
                            duration: 0.1,
                        }}
                        onHoverStart={hoverStart}
                        onHoverEnd={hoverEnd}
                        onClick={handleDelete}
                    >
                        <CloseIcon className={classes.deleteIcon} />
                        <motion.div
                            style={getStyle()}
                            className={classes.deleteCaption}
                        >
                            Delete User?
                        </motion.div>
                    </motion.div>
                </div>
            </Card>
            <Alert
                status={status}
                message={message}
                severity={severity}
                handleClose={handleClose}
            />
        </Animate>
    );
};

UserCard.propTypes = {
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    access: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    severity: PropTypes.string.isRequired,
    delay: PropTypes.number.isRequired,
    deleteAdminAction: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => {
    const { alert } = state;
    const { message, severity } = alert;
    return {
        message,
        severity,
    };
};
export default connect(mapStateToProps, { deleteAdminAction: deleteAdmin })(
    UserCard
);
