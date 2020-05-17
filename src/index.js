import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
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
import { setUser } from './actions';

const store = createStore(rootReducer, composeWithDevTools());

const Root = (props) => {
  console.log({ props });
  const { setUser } = props;
  const history = useHistory();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        history.push('/');
      }
    });
  }, [history, setUser]);
  return (
    <Switch>
      <Route exact path='/' component={App} />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
    </Switch>
  );
};

const RootWithAuth = withRouter(connect(null, { setUser })(Root));
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
