import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography } from '@material-ui/core';

import { connect } from 'react-redux';
import { getAllAdmin } from '../actions/admin';

import SubHeader from '../components/layout/subHeader';
import UserCard from '../components/userCard';

const useStyles = makeStyles((theme) => ({
    rootContainer: {
        padding: theme.spacing(4),
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
}));

const RemoveUser = (props) => {
    const classes = useStyles();
    const { getAllAdminAction, allAdmins, uid } = props;

    useEffect(() => {
        getAllAdminAction();
    }, [getAllAdminAction]);

    return (
        <section>
            <SubHeader title="Remove User" />
            <div className={classes.rootContainer}>
                {allAdmins.map((admin, index) => {
                    const { name, username, access, _id } = admin;
                    let user = (
                        <UserCard
                            name={name}
                            username={username}
                            access={access}
                            id={_id}
                            delay={index}
                        />
                    );
                    if (_id === uid) {
                        user = '';
                    }
                    return user;
                })}
                <Typography variant="h5">No more users to display</Typography>
            </div>
        </section>
    );
};

RemoveUser.propTypes = {
    getAllAdminAction: PropTypes.func.isRequired,
    uid: PropTypes.string.isRequired,
    allAdmins: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

const mapStateToProps = (state) => {
    const { admin, auth } = state;
    const { admins } = admin;
    const { user } = auth;
    return {
        allAdmins: admins,
        uid: user.id,
    };
};

export default connect(mapStateToProps, { getAllAdminAction: getAllAdmin })(
    RemoveUser
);
