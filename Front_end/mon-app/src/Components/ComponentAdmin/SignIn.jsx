import React, { Component } from 'react';
import jwt from 'jsonwebtoken'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Jumbotron from 'react-bootstrap/Jumbotron'
import axios from 'axios'
import { Redirect} from 'react-router-dom';
// import Header from './Header'
//--------------STORE----
import {connect} from 'react-redux'
import {signinadmin} from '../../store/action/admin';
import './CSS/Forms/Jumbotron.css'
import './CSS/H1.css'
import './CSS/Forms/button.css'
import './CSS/Container/ContainerSignInAdmin.css'
import ooo from '../Images/ooo.jpg';





class SignIn extends Component {

    state = {
        email: '',
        password: '',
        redirect: false
        //redirection fausse par defaut
    }

    
    //-------------Redirection sur le Dashboard
    setRedirect = () =>{
        this.setState({
        redirect: true
        //Quand la redirection est TRUE cad la personne c'est logue correctement
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to="/Dashboard"/>
            //Redirige vers Dashboard
        }
    }

    //--------------Onchange
    //onchange change la valeur du state
    inputemail = event => {
        // concerne le input de email un evenement y est creer
        this.setState({email: event.target.value});
         // Recupere la valeur rentrer dans le input de email et le modifie en fonction de ce qui y est entrer
    }
    inputpassword = event => {
        // concerne le input du password un evenement y est creer
        this.setState({password: event.target.value});
        // Recupere la valeur rentrer dans le input de password et le modifie en fonction de ce qui y est entrer
    }

    //---------------Onsubmit
     //onSubmit creer un evenement au moment du clic
     buttonsubmit = event => {
         event.preventDefault();

         const admin = {
             email: this.state.email,
             password: this.state.password
            // admin contient les data de email et password
         };
                    
        axios.post('http://localhost:4000/admin/sign-in',admin)
         .then(res => {
             console.log(res.data);
             this.setState({email:''});
             this.setState({password:''});
            //Modifie les donnees et les rboots avec ""

            //------------TOKEN----------------------------

             //Decode token
            let decodetoken = jwt.decode (res.data.token);
            // va decoder le jwt
             console.log(decodetoken);

             localStorage.setItem('token', res.data.token)
             //crer un nouvel element token qui correspond a token (enregistre)


             //------------------STORE-----------
             // creation d'un objet pour decoder les donees de l'admin connecter
              let logedadmin = {
                  token: res.data.token,
                  email: decodetoken.email,
                  id: decodetoken.id
              }
              // appel le store/action et prend en argument logeadmin
              this.props.signinadmin(logedadmin)


        this.setRedirect()
        //Redirige vers Dashboard


         })
         .catch(error => {
             console.error(error)
         })
     }
     

    render() {
        
            // !this.state.hide &&
            // <Header />
          
        return (
            <div className='principale'>
                <img class="imagesigninadmin" src={ooo} alt="plantes bananier" width="auto" height="400" /> 

            <Jumbotron>
                {this.renderRedirect()}

                
                 <h1>SE CONNECTER</h1>
        
                    <Form onSubmit={this.buttonsubmit}>
                        {/* on appel OnSubmit dans le form */}

                        <Form.Group controlId="formBasicEmail">
                        <Form.Label>Adresse email</Form.Label>
                           <Form.Control className="input" type="email"   onChange={this.inputemail} />
                            <Form.Text className="text-muted">
                           Ne partagez votre adresse mail avec personne
                            </Form.Text>
                        </Form.Group>


                        <Form.Group controlId="formBasicPassword">
                        <Form.Label>Mot de passe</Form.Label>
                       <Form.Control className="input" type="password"  onChange={this.inputpassword} />
                        </Form.Group>
                       
                        <div className='bouttonform'>
                        <Button className="click" variant="primary" type="submit">
                         Entrer
                        </Button>
                        </div>
                     </Form>
          </Jumbotron>
          </div>
        )
    }
}

const mapStateToProps = (state /* ownProps*/) => {
    return{

    }
}

const mapDispatchToProps = {signinadmin}

export default connect( //connect avec parametres 
    mapStateToProps,
    mapDispatchToProps
)(SignIn);
