import React, { Component } from 'react';
import jwt from 'jsonwebtoken'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Jumbotron from 'react-bootstrap/Jumbotron'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
//store
import {connect} from 'react-redux'
import {signinadmin} from '../../store/action/admin'
import '../ComponentAdmin/CSS/Forms/Jumbotron.css'

class SignInUser extends Component {
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

        const usersignin = {
            email: this.state.email,
            password: this.state.password,
           // admin contient les data de email et password
        };
         console.log(usersignin);
        axios.post('http://localhost:4000/user/sign-in',usersignin)
        .then(res => {
            console.log(res.data);
            this.setState({email:''});
            this.setState({password:''});
           //Modifie les donnees et les rboots avec ""

//----------Decode token-------------  
            let decodetoken = jwt.decode (res.data.token);
            // va decoder le jwt
             console.log(decodetoken);
             localStorage.setItem('token', res.data.token)
             //crer un nouvel element token qui correspond a token (enregistre)

            //j'appel mon action store
             this.props.signinadmin ({ email : decodetoken.email, token : res.data.token, id : decodetoken.id_user })

            //  this.props.enregistreToken(res.data.token)
            //  // Recupere le token dans la data et Enregistre le token dans 'enregistretoken' qui sera c ontenu dans la props
            //  this.props.enregistreid(decodetoken.id)
 
           this.setRedirect()
           //Redirige vers Dashboard

        
        })
        .catch(error => {
            console.error(error)
        })
    }

render() {
    return(
            <Jumbotron>
                 {this.renderRedirect()}
                    <h1>Connectez-vous!</h1>
            
                         <Form  onSubmit={this.buttonsubmit}>
                            {/* on appel OnSubmit dans le form */}
                     
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={this.inputemail} />
                            <Form.Text className="text-muted">
                           Ne partagez votre adresse mail avec personne
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={this.inputpassword} />
                        </Form.Group>
                       
                        <div className='bouttonform'>
                        <Button className="click" variant="primary" type="submit">
                            Envoyer
                        </Button>
                        </div>
                     </Form>
            </Jumbotron>
        )
    }

}








const mapDispatchToProps = {signinadmin}// action connect aux props

export default connect( //connect avec parametres 
    null,
    mapDispatchToProps
)(SignInUser);
