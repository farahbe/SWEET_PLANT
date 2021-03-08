import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Jumbotron from 'react-bootstrap/Jumbotron'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import './validateform.css';
import './CSS/Forms/Jumbotron.css'
import '../ComponentAdmin/validateform.css'
import './CSS/Container/ContainerSignUpAdmin.css'
import nnn from '../Images/nnn.jpg';




class SignUp extends Component {
    state = {
        email: '',
        password: '',
        redirect: false,
        // Redirection fausse par defaut
        errors: {},
    }


// ---------REDIRECTION SUR LE DASHBOARD
setRedirect = () =>{
    this.setState({
        redirect: true
    })
    // Quand redirection devient vraie cest a dire la personne cest loger correctement
}

renderRedirect = () => {
    if (this.state.redirect) {
        return <Redirect to='/SignIn'/>
        // Redirige vers Dashboard 
    }
}

    //--------------Onchange    
    //onchange change la valeur du state
    inputemail = (event) => {
        // concerne le input de email un evenement y est creer
        this.setState({ email: event.target.value });
         // Recupere la valeur rentrer dans le input de email et le modifie en fonction de ce qui y est entrer
    };

    inputpassword = (event) => {
        this.setState({ password: event.target.value });
    };

    //---------------Onsubmit
     //onSubmit creer un evenement au moment du clic
     buttonSubmit = (event) => {
         if(this.validateForm()){
        event.preventDefault();

        const adminsignup = {
            email: this.state.email,
            password: this.state.password
           // admin contient les data de email et password
        };

        axios.post('http://localhost:4000/admin/sign-up', adminsignup)
        .then(res => {
            console.log(res.data);
            this.setState({email:''});
            this.setState({password:''});
            //Modifie les donnees et les rboots avec ""

           
            this.setRedirect();
            // Redirige vers SignIn

            })
        .catch(error => {
            console.error(error)
        })
    }
    
    };

    validateForm = () => {

        // let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //----EMAIL
        if (!this.state.email) {
            formIsValid = false;
            errors["email"] = "*Entrez votre email.";
        }

        if (typeof this.state["email"] !== "undefined") {
            //regular expression for email validation
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(this.state["email"])) {
                formIsValid = false;
                errors["email"] = "*svp entrez un email valide.";
            }
        }
        //--PASSWORD
        if (!this.state.password.length) {
            formIsValid = false;
            errors["password"] = "*svp entrez votre mot de passe.";
        }
        
         else if (typeof this.state["password"] !== "undefined") {
            if (this.state.password.length < 8) {
                formIsValid = false;
                errors["password"] = "*Entrez un mot de passe valide.";
            }
        }

        this.setState({
            errors: errors
        });
        return formIsValid;

    }

    render () {
    return (
        <div className='signupAdmin'>
                <img class="imagesigninadmin" src={nnn} alt="plantes bananier" width="auto" height="400" /> 
           
            {this.renderRedirect()}
            <Jumbotron>
                <h1>Creer un compte Admin !</h1>
                <Form onSubmit={this.buttonSubmit}>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={this.inputemail} />
                        <div className="errorMsg">{this.state.errors.email}</div>
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={this.inputpassword} />
                        <div className="errorMsg">{this.state.errors.password}</div>
                    </Form.Group>
                    
                    <div className='bouttonform'>
                   <Button className="click" variant="primary" type="submit">
                        Submit
                    </Button>
                    </div>
                </Form>
             
            </Jumbotron>
        </div>
    );
}


}

export default SignUp;