import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import SubHeader from '../components/layout/subHeader';
import Loader from '../components/loader';

const useStyles = makeStyles((theme) => ({
  rootContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  firstHalf: {
    padding: theme.spacing(5),
    width: '40%',
    minWidth: '400px',
  },
  secondHalf: {
    minWidth: '400px',
    padding: theme.spacing(5),
    width: '40%',
  },
  title: {
    fontWeight: 700,
  },
  miniLine: {
    width: '50px',
    height: '5px',
    borderRadius: '2px',
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(0.3),
    backgroundColor: theme.palette.primary.main,
  },
  access: {
    fontStyle: 'italic',
    marginTop: theme.spacing(3),
  },
  btnContainer: {
    display: 'flex',
    padding: theme.spacing(3),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  btn: {
    width: '100px',
    height: '100px',
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
}));

const Profile = (props) => {
  const classes = useStyles();
  const { user, loading } = props;
  const {
    name, username, access,
  } = user;
  if (loading) {
    return <Loader />;
  }
  return (
    <section>
      <SubHeader title="Profile" text={username} />
      <div className={classes.rootContainer}>
        <div className={classes.firstHalf}>
          <div>
            <Typography variant="h3" className={classes.title}>
              <span>Welcome,</span>
              {' '}
              {name}
            </Typography>
          </div>
          <Typography variant="subtitle1" className={classes.access}>
            Your privilege is currently that of
            {' '}
            {access}
          </Typography>
          <div className={classes.miniLine} />
          <div className={classes.btnContainer}>
            <Button variant="outlined" className={classes.btn}>
              Add Item
            </Button>
            <Button variant="outlined" className={classes.btn}>
              Remove Item
            </Button>
            <Button variant="outlined" className={classes.btn}>
              Add User
            </Button>
            <Button variant="outlined" className={classes.btn}>
              Remove User
            </Button>
            <Button variant="outlined" className={classes.btn}>
              Edit Item
            </Button>
          </div>
        </div>
        <div className={classes.secondHalf}>
          <div>
            <Typography variant="h3" className={classes.title}>
              <span>Recent Purchases</span>
            </Typography>
          </div>
          <div className={classes.miniLine} />

        </div>
      </div>
    </section>
  );
};

Profile.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object]).isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const { auth } = state;
  const { loading } = auth;
  return {
    user: auth.user,
    loading,
  };
};

export default connect(mapStateToProps)(Profile);
