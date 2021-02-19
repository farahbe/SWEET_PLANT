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
import ToutArticles from './Components/ComponentAdmin/ToutArticles'
import Header from './Components/ComponentAdmin/Header';
import Recherche from './Components/ComponentAdmin/Recherche'
import ArticleDetails from './Components/ComponentAdmin/ArticleDetails'
import Categorie from './Components/ComponentAdmin/Categorie'
import ModifierArticle from './Components/ComponentAdmin/ModifierArticle'
import About from './Components/ComponentAdmin/About'
// import Nav from './Components/ComponentAdmin/Nav'

//------Private Route
import PrivateRoute from './privateroute.js/privateRouteAdmin'
// import PrivateRouteUser from './privateroute.js/privateRouteUser'



// CREER LE STORE
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
      <Route path="/SignIn" component={SignIn} />
      <Route path="/SignUp" component={SignUp} />
      <Route path="/SignInUser" component={SignInUser} />
      <Route path="/SignUpUser" component={SignUpUser} />
      {/* <Route path="/Dashboard" component={Dashboard} /> */}
      {/* <Route path="/CreateArticle" component={CreateArticle} /> */}
      <Route path="/Galerie" component={ToutArticles} />
      <Route path="/Recherche" component={Recherche} />
      <Route path="/Article/:id" component={ArticleDetails} />
      <Route path="/Categorie/:id" component={Categorie} />
      {/* <Route path="/ModifierArticle" component={ModifierArticle} /> */}
      {/* <Route path="/Nav" component={Nav} /> */}
      <Route path="/About" component={About} />


      {/* //PRIVATE ROUTE ADMIN */}
      <PrivateRoute path="/CreateArticle" component={CreateArticle} />
      <PrivateRoute path="/Dashboard" component={Dashboard} />
      <PrivateRoute path="/ModifierArticle/:id" component={ModifierArticle} />

        {/* //PRIVATE ROUTE USER */}
       
      
      
      

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
