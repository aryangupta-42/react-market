import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography, Card } from '@material-ui/core';

import Animate from './animate';

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
        lineHeight: '50px',
        cursor: 'pointer',
        borderRadius: '30px',
        textAlign: 'center',
        backgroundColor: 'red',
    },
}));

const UserCard = (props) => {
    const { name, username, access, id } = props;
    const classes = useStyles();
    return (
        <Animate>
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
                    <div className={classes.userCardDeleteBtn}>X</div>
                </div>
            </Card>
        </Animate>
    );
};

UserCard.propTypes = {
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    access: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};

export default UserCard;
