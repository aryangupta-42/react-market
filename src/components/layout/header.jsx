import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 0.2,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  navContainer: {
    flexGrow: 1,
    color: 'rgba(0,0,0,0.3)',
  },
  center: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  navElement: {
    textDecoration: 'none',
    fontStyle: 'none',
    color: 'white',
    width: 'auto',
    backgroundColor: 'rgba(250, 250, 250, 0.3)',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    borderRadius: '20px',
    margin: theme.spacing(2),
    display: 'block',
    transition: '0.2s ease-out',
    '&:hover, &:focus': {
      boxShadow: theme.shadows[1],
      backgroundColor: 'white',
      color: 'black',
    },
  },
  loginButton: {
    flexGrow: 0.2,
    color: 'white',
    paddingLeft: theme.spacing(7),
    paddingRight: theme.spacing(7),
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
  logoutButton: {
    flexGrow: 0.2,
    color: 'white',
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
  adminNav: {
    textDecoration: 'none',
    fontStyle: 'none',
  },
}));


const LogBtn = (props) => {
  const classes = useStyles();

  const { logoutBool, logoutAction } = props;
  if (logoutBool) {
    return (
      <Button color="inherit" className={classes.logoutButton} onClick={logoutAction}>
        Logout
      </Button>
    );
  }
  return (
    <Link to="/admin" className={classes.adminNav}>
      <Button color="inherit" className={classes.loginButton}>
        Login
      </Button>
    </Link>
  );
};

LogBtn.propTypes = {
  logoutBool: PropTypes.bool.isRequired,
  logoutAction: PropTypes.func.isRequired,
};

const Header = (props) => {
  const classes = useStyles();

  const { logoutBool, logoutAction } = props;
  let navOption1;
  let navOption2;
  if (logoutBool) {
    navOption1 = (
      <Typography>
        <Link to="/cart" className={classes.navElement}>
          Cart
        </Link>
      </Typography>
    );
    navOption2 = (
      <Typography>
        <Link to="/profile" className={classes.navElement}>
          Profile
        </Link>
      </Typography>
    );
  }
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Xeno
        </Typography>
        <Breadcrumbs separator="|" aria-label="breadcrumb" classes={{ root: classes.navContainer, ol: classes.center }}>
          <span />
          <Typography>
            <Link to="/" className={classes.navElement} aria-current="page">
              Home
            </Link>
          </Typography>
          <Typography>
            <Link to="/about" className={classes.navElement}>
              About
            </Link>
          </Typography>
          {navOption1}
          {navOption2}
          <span />
        </Breadcrumbs>
        <LogBtn logoutBool={logoutBool} logoutAction={logoutAction} />
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  logoutBool: PropTypes.bool.isRequired,
  logoutAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { auth } = state;
  let value = false;
  if (auth.token !== null && auth.user !== null) {
    value = true;
  }
  return {
    logoutBool: value,
  };
};

export default connect(mapStateToProps, { logoutAction: logout })(Header);
