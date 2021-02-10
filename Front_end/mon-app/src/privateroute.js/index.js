import React from 'react';
import { Route, Redirect } from 'react-router-dom';

var jwt = require('jsonwebtoken');

class PrivateRoute extends React.Component {

    render() {
        let token = localStorage.getItem("token");
        //recupere le token dans le local storage
        let decoded = jwt.decode(token)
        //decode le token
        console.log(decoded);

        console.log(this.props.component);
        console.log(decoded);

        if (decoded && decoded.admin === true) {
        return (
            <>
               {decoded && decoded.admin ? (// demande si decoded.admin = true
                <Route component={this.props.component} path={this.props.path} /> 
                // decoded = a decoded.admin alors il aura acces a tout les component 
                //qui contient les private route et accedera a sa route attibuer
              ) : (
                <Redirect
                  to={{
                    pathname: "/Home",
                  }}
                />
              )}
            </>

          );
        }else if (decoded && decoded.user === true) {
          return (
              <>
              {decoded && decoded.user ? (<Route component={this.props.component} path={this.props.path} />
              ) : (
                <Redirect
                to={{
                  pathname: '/Home',
                }}
                />
              )}
              </>
            )} else {
              return (
                <Redirect
                to={{
                  pathname: '/Home',
                }}
                />
              )
            }
    }

  }

  export default PrivateRoute
