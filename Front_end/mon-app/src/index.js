import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router,Switch,Route } from "react-router-dom";
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
//-----store-----
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import mainReducer from './store/reducer';
//-----components
import Dashboard from './Components/ComponentAdmin/Dashboard'
import SignIn from './Components/ComponentAdmin/SignIn'
import Home from  './Components/Home'
import SignUp from './Components/ComponentAdmin/SignUp'
import SignInUser from './Components/ComponentUser/SignInUser'
import SignUpUser from './Components/ComponentUser/SignUpUser'
import CreateArticle from './Components/ComponentAdmin/CreateArticle';
import ToutArticle from './Components/ComponentAdmin/ToutArticles'
import Header from './Components/ComponentAdmin/Header'
import PrivateRoute from './privateroute.js/index'

const store = createStore(
  mainReducer, /* preloadedState, */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 );

const myRouter = (
  <Provider store={store}>
  <Router forceRefresh={true}>
      <Header />
      <Switch> 
      <Route path="/Home" component={Home} />
      <PrivateRoute path="/Dashboard" component={Dashboard} />
      <Route path="/SignIn" component={SignIn} />
      <Route path="/SignUp" component={SignUp} />
      <Route path="/SignInUser" component={SignInUser} />
      <Route path="/SignUpUser" component={SignUpUser} />
      <Route path="/CreateArticle" component={CreateArticle} />
      <Route path="/ToutArticle" component={ToutArticle} />


      </Switch>
  </Router>
  </Provider>

)
ReactDOM.render(myRouter, document.getElementById('root'));





// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );


reportWebVitals();
