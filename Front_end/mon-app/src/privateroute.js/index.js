import React from 'react';
import { Route, Redirect } from 'react-router-dom';
var jwt = require('jsonwebtoken');

class PrivateRoute extends React.Component {

    render() {
        let token = localStorage.getItem("token");
        let decoded = jwt.decode(token)
        console.log(decoded);
        console.log(this.props.component);
        console.log(decoded);
        return (
            <>
              {decoded && decoded.admin ? (// decoded = variable qui contient le decoded de mon token//decoded.admin = admin de l'objet dans le sign in
                <Route component={this.props.component} path={this.props.path} /> // decoded = a decoded.admin alors il aura acces a tout les component 
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
    }

  }

  export default PrivateRoute
