import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3.5),
    paddingBottom: 0,
    backgroundColor: theme.palette.secondary.light,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyItems: 'center',
    alignItems: 'center',
  },
  icon: {
    paddingTop: theme.spacing(0.2),
    marginRight: theme.spacing(1.5),
  },
  title: {
    marginLeft: theme.spacing(1.5),
    fontWeight: 100,
    display: 'flex',
  },
  bottomBar: {
    width: '100%',
    height: '2px',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: '2px',
    marginTop: theme.spacing(3.5),
  },
}));

const SubHeader = (props) => {
  const classes = useStyles();
  const {
    title,
  } = props;
  let icon;
  if (title === 'Home') {
    icon = <HomeIcon fontSize="large" />;
  } else if (title === 'About') {
    icon = <InfoIcon fontSize="large" />;
  } else if (title === 'Cart') {
    icon = <ShoppingCartIcon fontSize="large" />;
  }

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        <span className={classes.icon}>
          {icon}
        </span>
        {title}
      </Typography>
      <div className={classes.bottomBar} />
    </div>
  );
};

SubHeader.propTypes = {
  title: PropTypes.string,
};

SubHeader.defaultProps = {
  title: 'Xeno',
};

export default SubHeader;
