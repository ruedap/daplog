import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Articles from 'components/pages/articles'
import Article from 'components/pages/article'

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Articles} />
      <Route exact path="/:year/:month/:day/:title" component={Article}/ >
    </Switch>
  </Router>
);

export default App;
