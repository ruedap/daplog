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
      <Route exact path="/">
        <Articles />
      </Route>

      <Route exact path="/:year/:month/:day/:title">
        <Article />
      </Route>
    </Switch>
  </Router>
);

export default App;
