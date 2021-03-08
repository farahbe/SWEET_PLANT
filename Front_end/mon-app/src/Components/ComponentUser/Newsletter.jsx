import React, { Component } from 'react';
// import InputGroup from 'react-bootstrap/InputGroup'
// import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';

import { connect } from 'react-redux'
import { ajout_email } from '../../store/action/newsletter'

import axios from 'axios';

// import '../ComponentAdmin/CSS/Newsletter.css'
import "../ComponentAdmin/CSS/Forms/Input.css"
import '../ComponentAdmin/CSS/Cards/Cardstext.css'
import '../ComponentAdmin/CSS/Forms/Formtitle.css'



class Newsletter extends Component {
    state = {
        Email: '',
    }

    //onChange
    inputemail = (event) => {
        this.setState({ Email: event.target.value });
    }

    //On onSubmit Email
    buttonsubmit = (event) => {
        event.preventDefault();

        const adresseuser = {
            Email: this.state.Email,

        };
        axios.post('http://localhost:4000/user/ajoutadresse', adresseuser)
            .then(res => {
                // console.log(adresseuser);
                this.setState({ Email: '' });

                this.props.ajout_email(adresseuser)
            })
            .catch(error => {
                console.error(error)
            })
    }

    render() {
        return (
            <div>

                <div className='div'>

                    <Form onSubmit={this.buttonsubmit}>

                        <Form.Group controlId="formBasicpseudo">
                        <Form.Label>NEWSLETTER</Form.Label>
                       
                        <Form.Control type="text"  name="Email"  onChange={this.inputemail} />
                       <hr></hr>
                        </Form.Group>
                        <Form.Text className="text-muted">
                        Entrez votre Adresse email pour recevoir notre Newsletter
                        </Form.Text>
                        <div className='boutton'>
                        <Button className='b' variant="primary" type="submit">
                         Entrer
                        </Button>
                        </div>
                       
                    </Form>

                </div>
            </div>
        )
    }


}

const mapStateToProps = (state /*, ownPrps*/) => {
    //mapStateToProps permet de parcourir les props

    return {
        Email: state.emailreducer.Email
    }
}

const mapDispatchToProps = { ajout_email }
//mapDispatchToProps dispatche l'action a toutes les props

export default connect(mapStateToProps,mapDispatchToProps)(Newsletter);