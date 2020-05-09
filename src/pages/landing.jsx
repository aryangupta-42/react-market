import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import SubHeader from '../components/layout/subHeader';
import Item from '../components/item';

const useStyles = makeStyles((theme) => ({
  itemContainer: {
    width: '80%',
    height: 'auto',
    padding: theme.spacing(4),
    margin: 'auto',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
}));

const Landing = () => {
  const classes = useStyles();

  return (
    <div>
      <SubHeader title="Home" />
      <div className={classes.itemContainer}>
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    </div>
  );
};

export default Landing;
