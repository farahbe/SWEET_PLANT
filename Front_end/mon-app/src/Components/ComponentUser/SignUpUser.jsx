import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Jumbotron from 'react-bootstrap/Jumbotron'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import "../ComponentAdmin/CSS/Forms/Jumbotronsignup.css"
import "../ComponentAdmin/CSS/Page/pagesignupuser.css"


class SignUpUser extends Component {
    state = {
        email: '',
        password: '',
        pseudo: '',
        prenom: '',
        // date_de_naissance: '',
        avatar: '',
        redirect: false,
        //redirection fausse par defaut
        errors: {}
    }

 
   
    //-------------Redirection sur le Dashboard
    setRedirect = () => {
        this.setState({
            redirect: true
            //Quand la redirection est TRUE cad la personne c'est logue correctement
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to="/SignInUser" />
            //Redirige vers Signinuser
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
    inputpseudo = (event) => {
        this.setState({ pseudo: event.target.value });
    };
    inputprenom = (event) => {
        this.setState({ prenom: event.target.value });
    };
    // inputdate_de_naissance = (event) => {
    //     this.setState({ date_de_naissance: event.target.value });
    // };
    inputavatar = (event) => {
        this.setState({ avatar: event.target.value });
    };
    //---------------Onsubmit
    //onSubmit creer un evenement au moment du clic
    buttonSubmit = (event) => {
        event.preventDefault();
        if (this.validateForm()) {
            const usersignup = {
                email: this.state.email,
                password: this.state.password,
                pseudo: this.state.pseudo,
                prenom: this.state.prenom,
                // date_de_naissance: this.state.date_de_naissance,
                Avatar: this.state.avatar,
                // usersignup contient les data de email et password

            };
            axios.post('http://localhost:4000/user/sign-up', usersignup)
                .then(res => {
                    console.log(res.data);
                    this.setState({ email: '' });
                    this.setState({ password: '' });
                    this.setState({ pseudo: '' });
                    this.setState({ prenom: '' });
                    // this.setState({ date_de_naissance: '' });
                    this.setState({ avatar: '' });
                    //Modifie les donnees et les rboots avec ""

                    this.setRedirect();
                    // // Redirige vers SignIn

                })
                .catch(error => {
                    console.error(error)
                })
        }

        //----------VALIDATION FORM
    }
    validateForm = () => {

        // let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //----EMAIL
        if (!this.state.email) {
            formIsValid = false;
            errors["email"] = "*Emtrez votre email.";
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

        //---PSEUDO            
        if (!this.state["pseudo"]) {
            formIsValid = false;
            errors["pseudo"] = "*Entrez votre pseudo.";
        }

        if (typeof this.state["pseudo"] !== "undefined") {
            if (!this.state["pseudo"].match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["pseudo"] = "*Entrez des caracteres seulement.";
            }
        }

        //---PRENOM          
        if (!this.state["prenom"]) {
            formIsValid = false;
            errors["prenom"] = "*Entrez votre prenom.";
        }

        if (typeof this.state["prenom"] !== "undefined") {
            if (!this.state["pseudo"].match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["pseudo"] = "*Entrez des caracteres seulement.";
            }
        }

        //----Date de naissance
        // if (!this.state["date_de_naissance"]) {
        //     formIsValid = false;
        //     errors["date_de_naissance"] = "*Entrez votre date de naissance.";
        // }

        // if (typeof this.state["date_de_naissance"] !== "undefined") {
        //     if (!this.state["date_de_naissance"].match(/^[0-9]{2}-[0-9]{2}-[0-9]{4}$/)) {
        //         formIsValid = false;
        //         errors["date_de_naissance"] = "*Entrez une date de naissance valide.";
        //     }
        // }

        this.setState({
            errors: errors
        });
        return formIsValid;

    }

    render() {
        return (
            <div id='signupuserpage'>
                <Jumbotron className='signup'>
                    {this.renderRedirect()}
                    <h1>Inscrivez-vous!</h1>

                    <Form onSubmit={this.buttonSubmit}>

                        <Form.Group controlId="formBasicpseudo">
                            <Form.Label> Pseudo </Form.Label>
                            <Form.Control type="text" name="pseudo" placeholder="Enter pseudo" onChange={this.inputpseudo} />
                            <div className="errorMsg">{this.state.errors.pseudo}</div>
                            <Form.Text className="text-muted"> Veuillez rentrer votre Pseudo </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicprenom">
                            <Form.Label>Prenom</Form.Label>
                            <Form.Control type="prenom" placeholder="Enter prenom" onChange={this.inputprenom} />
                            <div className="errorMsg">{this.state.errors.prenom}</div>
                            <Form.Text className="text-muted">
                                Veuillez rentrer votre Prenom
                    </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={this.inputemail} />
                            <div className="errorMsg">{this.state.errors.email}</div>
                            <Form.Text className="text-muted">
                                Veuillez rentrer votre Email
                    </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={this.inputpassword} />
                            <div className="errorMsg">{this.state.errors.password}</div>
                            <Form.Text className="text-muted">
                                Ne partagez votre Mot de passe avec personne
                    </Form.Text>
                        </Form.Group>

                        {/* <Form.Group controlId="formBasic_date_de_naissance">
                            <Form.Label> Date de naissance </Form.Label>
                            <Form.Control type="date" name="date_de_naissance" placeholder="Enter date de naissance" onChange={this.inputdate_de_naissance} />
                            <div className="errorMsg">{this.state.errors.date_de_naissance}</div>
                            <Form.Text className="text-muted"> Veuillez rentrer votre Date de naissance </Form.Text>
                        </Form.Group> */}

                       

                        {/* <Form.Group>
                        <Form.Label> Avatar </Form.Label>
                             <Form.File id="exampleFormControlFile1" label="Choisir votre Avatar" />
                        </Form.Group> */}

                        <Form.Group controlId="formBasicimage">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control type="text" onChange={this.inputavatar}  />
                                    <Form.Text className="text-muted">
                                        Selectionnez votre image
                        </Form.Text>
                                </Form.Group>

                        <div className='bouttonform'>
                        <Button className="click" variant="primary" type="submit">
                            Submit
                        </Button>
                        </div>
                    </Form>

                </Jumbotron>

            </div>
        )
    }

}

export default SignUpUser;