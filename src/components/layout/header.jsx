import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


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
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Xeno
        </Typography>
        <Breadcrumbs separator="|" aria-label="breadcrumb" classes={{ root: classes.navContainer, ol: classes.center }}>
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
          <Typography>
            <Link to="/cart" className={classes.navElement}>
              Cart
            </Link>
          </Typography>
          <Typography>
            <Link to="/cart" className={classes.navElement}>
              Cart
            </Link>
          </Typography>
        </Breadcrumbs>
        <Button color="inherit" className={classes.loginButton}>Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
