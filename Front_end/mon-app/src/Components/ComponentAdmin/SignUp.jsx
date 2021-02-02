import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Jumbotron from 'react-bootstrap/Jumbotron'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import './validateform.css';



class SignUp extends Component {
    state = {
        email: '',
        password: '',
        redirect: false
        // Redirection fausse par defaut
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
    
    };

    render () {
    return (
        <div>
            {this.renderRedirect()}
            <Jumbotron>
                <h1>Creer un compte Admin !</h1>
                <Form onSubmit={this.buttonSubmit}>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={this.inputemail} />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={this.inputpassword} />
                    </Form.Group>
                    
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
             
            </Jumbotron>
        </div>
    );
}


}

export default SignUp;