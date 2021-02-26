import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Jumbotron from 'react-bootstrap/Jumbotron'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
//------STORE--------
import { connect } from 'react-redux';
import { creatstorearticle } from '../../store/action/ajout_article';// const dans l'action

class CreateArticle extends Component {
    state = {
        
    selectedFile: null, 
     titre: '',
      paragraphe: '',
      image: '',
      Date_de_publication: '',
      redirect: false
      
    }

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


     //onChange
     inputtitre = event => {
        this.setState({ titre: event.target.value });
    }
    inputparagraphe = event => {
        this.setState({ paragraphe: event.target.value });
    }
    inputimage = event => {
        this.setState({ image: event.target.value });
    }
    // inputimage = event => {
    //     this.setState({ Date_de_publication: event.target.value });
    // }
    

    
    //onSubmit
    buttonsubmit = event => {
        event.preventDefault();


        const article = {
            titre: this.state.titre,
            paragraphe: this.state.paragraphe,
            image: this.state.image,
            Date_de_publication: this.state.Date_de_publication,
            id_admin: this.props.id
           
        };

        
        axios.post('http://localhost:4000/admin/articles',article, {headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }})
        //{headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }} recupere le header du token dans le Adminconnect
        .then(res => {
            console.log(article);
            // console.log(res.data);
            this.setState({titre:''});
            this.setState({paragraphe:''});
            this.setState({image:''});
            this.setState({Date_de_publication:''});
           //Modifie les donnees et les rboots avec ""


            //Creation du store pour ajouter un article ajout de la const dans le store action
           this.props.creatstorearticle(article)

           this.setRedirect();
           //Redirige vers Dashboard
    })
    .catch(error => {
        console.error(error)
    })
}



    render() {
        console.log(this.props.token);
        return(
            <div>
                <Jumbotron>
                {this.renderRedirect()}
                    <h1>Article!</h1>
                    <Form onSubmit={this.buttonsubmit}>
                    <Form.Group controlId="formBasictitre">
                        <Form.Label>Titre</Form.Label>
                        <Form.Control type="text" placeholder="Enter titre" onChange={this.inputtitre} />
                        <Form.Text className="text-muted">
                        Entrez un titre a votre article
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicparagraphe">
                        <Form.Label>Paragraphe</Form.Label>
                        <Form.Control as="textarea" placeholder="Paragraphe" onChange={this.inputparagraphe} />
                        <Form.Text className="text-muted">
                        Entrez votre paragraphe
                        </Form.Text>
                    </Form.Group>

                    
                    <Form.Group controlId="formBasicPicture">
                            <Form.Label>Picture</Form.Label>
                            <Form.Control type="texte" placeholder="Enter a Picture link" onChange={this.inputimage} />
                        </Form.Group> 

                    <Form.Group controlId="formBasicDate_de_publication">
                            <Form.Label> Date de cretation article</Form.Label>
                            <Form.Control type="date" name="Date_de_publication" placeholder="Enter date de creation article" onChange={this.inputDate_de_publication} />
                            {/* <div className="errorMsg">{this.state.errors.Date_de_publication}</div> */}
                            <Form.Text className="text-muted"> Veuillez rentrer votre Date de Publication </Form.Text>
                        </Form.Group>

                    
                    <Button variant="primary" type="submit">
                        Entrer
                    </Button>
                    </Form>
                    <button onClick={this.fileUploadHandler}>Upload</button>

                </Jumbotron>
            </div>
        )
        }
    }

const mapStateToProps = (state /*, owmProps*/) => {
    return {
        createarticleforstore: state.articlereducer.payloadd,
        token: state.adminreducer.token,
        id: state.adminreducer.id
    } 
}

const mapDispatchToProps = {creatstorearticle } //va chercher creatstorearticle

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle) //=class CreateArticle extends Component;