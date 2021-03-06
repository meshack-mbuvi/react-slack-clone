import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebase from './firebase';
import { useHistory } from 'react-router-dom';
import { withRouter } from 'react-router';

// Redux setup
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider, connect } from 'react-redux';
import rootReducer from './reducers';
import { setUser, clearUser } from './actions';
import Spinner from './Spinner';

// components
import Home from './components/Home';
import App from './components/App';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

const store = createStore(rootReducer, composeWithDevTools());

const Root = (props) => {
  const { setUser, isLoading, clearUser } = props;

  const history = useHistory();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        history.push('/');
      } else {
        // history.push('/login');
        clearUser();
      }
    });
  }, [history, setUser, clearUser]);
  return isLoading ? (
    <Spinner />
  ) : (
    <Switch>
      <Route exact path='/' component={Home} />

      {/* <Route path='/' component={App} /> */}
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
    </Switch>
  );
};

const mapStateFromProps = (state) => ({
  isLoading: state.user.isLoading,
});

const RootWithAuth = withRouter(
  connect(mapStateFromProps, { setUser, clearUser })(Root)
);
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
