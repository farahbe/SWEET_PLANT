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
import Footer from "./Components/Footer"
// import Newsletter from "./Components/ComponentUser/Newsletter"
import Dashboarduser from "./Components/ComponentUser/Dashboarduser"
import Modifierinfosuser from "./Components/ComponentUser/Modifierinfosuser"
// import Ecrirecommentaire from "./Components/ComponentUser/Ecrirecommentaire"
// import Burgeradmin from "./Components/ComponentAdmin/Burgeradmin"

//------importe Police et css
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';


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
      {/* <Burgeradmin /> */}
     
     
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
      {/* <Route path="/Newsletter" component={Newsletter} /> */}
      {/* <Route path="/Dashboarduser/:id" component={Dashboarduser} /> */}
      {/* <Route path="/Modifierinfosuser/:id" component={Modifierinfosuser} /> */}
      {/* <Route path="/Ecrirecommentaire/:id" component={Ecrirecommentaire} /> */}


      {/* //PRIVATE ROUTE ADMIN */}
      <PrivateRoute path="/CreateArticle" component={CreateArticle} />
      <PrivateRoute path="/Dashboard" component={Dashboard} />
      <PrivateRoute path="/ModifierArticle/:id" component={ModifierArticle} />

        {/* //PRIVATE ROUTE USER */}     
        <PrivateRoute path="/Modifierinfosuser/:id" component={Modifierinfosuser} />
        <PrivateRoute path="/Dashboarduser/:id" component={Dashboarduser} />

      </Switch> 
   <Footer />   
  </Router>
  
  </Provider>

)
ReactDOM.render(myRouter, document.getElementById('root'));




reportWebVitals();
