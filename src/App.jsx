import React from 'react';

import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Header from './components/layout/header';
import Landing from './pages/landing';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
        <Header />
        <Switch>
          <Route exact path="/" component={Landing} />
          {/* <Route path="/about" component={Aboutf} /> */}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
