import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

import SubHeader from '../components/layout/subHeader';
import UserCard from '../components/userCard';

const useStyles = makeStyles((theme) => ({
    rootContainer: {
        padding: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
}));

const RemoveUser = () => {
    const classes = useStyles();

    return (
        <section>
            <SubHeader title="Remove User" />
            <div className={classes.rootContainer}>
                <UserCard
                    name="Arjun Gupta"
                    username="arjungupta"
                    access="superadmin"
                    id="afjklajflkjkl;sjfkljl;"
                />
            </div>
        </section>
    );
};

export default RemoveUser;
