import axios from 'axios';
import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import jwt from 'jsonwebtoken'
import {withRouter} from "react-router-dom"


class Ecrirecommentaire extends Component {
    state = {
        paramodifier: [],
        paragraphe: '',

    }

    //---ONCHANGE
    inputparagraphe = event => {
        this.setState({ paragraphe: event.target.value });
    }

    //----DIDMOUNT


    //----ONSUBMIT
    buttonsubmit = event => {
        event.preventDefault();

const { id } = this.props.match.params

let decodetoken = jwt.decode(localStorage.getItem("token"))
        const para = {
            commentaire: this.state.paragraphe,
            id_article: id, 
            id_user: decodetoken.id,
        }
        
        axios.post('http://localhost:4000/user/postcomments',para)
        .then(res => {
            this.setState({paragraphe: ''});

            if (res.status === 200) {
                console.log(res);
                console.log(res.data);
                this.setState({ msgSuccess: "commentaire ajoute avec succès" })

                this.setState({paramodifier: res.data[0] });
                // element recoit les data de lobjet correspondant a lID envoyer 

            }
        })
        .catch(error => {
            console.error(error)
        })


    }

    render() {
        return(
            <div>
                <Jumbotron>
                <h1>ecris ton commentaire</h1>
                <Form onSubmit={this.buttonsubmit}>
                   

                    <Form.Group controlId="formBasicparagraphe">
                        <Form.Label className='para'>Paragraphe</Form.Label>
                        <Form.Control className="text2" as="textarea" placeholder="Entrez votre paragraphe" onChange={this.inputparagraphe} />
                       
                    </Form.Group>

                    <Button className='button' variant="primary" type="submit">
                        Entrer
                    </Button>
                    
                    </Form>
                
                </Jumbotron>
            </div>
        )
    }
}
export default withRouter(Ecrirecommentaire);
