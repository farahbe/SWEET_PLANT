import axios from 'axios';
import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import jwt from 'jsonwebtoken'
import { withRouter } from "react-router-dom"
import '../ComponentAdmin/CSS/Container/ContainerEcrireArticle.css'
import '../ComponentAdmin/CSS/Forms/Jumbotroncommentaire.css'
import '../ComponentAdmin/CSS/Cards/Buttonjaune.css'


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
            id_user: decodetoken.id_user,
        }

        axios.post('http://localhost:4000/user/postcomments', para, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            .then(res => {
                this.setState({ paragraphe: '' });

                if (res.status === 200) {
                    console.log(res);
                    console.log(res.data);
                    this.setState({ msgSuccess: "commentaire ajoute avec succès" })

                    this.setState({ paramodifier: res.data[0] });
                    // element recoit les data de lobjet correspondant a lID envoyer 

                }
            })
            .catch(error => {
                console.error(error)
            })

    }

    render() {
        return (
            <div className='ecrirecomments'>
                <Jumbotron className='Jumbotroncommentaire'>
                    <h2>Ecris ton commentaire</h2>
                    <Form onSubmit={this.buttonsubmit}>

                        <Form.Group controlId="formBasicparagraphe">
                            <Form.Control className="text2" as="textarea" placeholder="Entrez votre paragraphe" onChange={this.inputparagraphe} />
                        </Form.Group>
                        <div className='boutton'>
                            <Button className='b' className='button' variant="primary" type="submit">
                                Entrer
                        </Button>
                        </div>
                    </Form>
                </Jumbotron>
            </div>
        )
    }
}
export default withRouter(Ecrirecommentaire);
