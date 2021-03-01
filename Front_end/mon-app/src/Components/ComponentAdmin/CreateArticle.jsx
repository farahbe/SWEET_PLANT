import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Jumbotron from 'react-bootstrap/Jumbotron'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
//------STORE--------
import { connect } from 'react-redux';
import { creatstorearticle } from '../../store/action/ajout_article';// const dans l'action

import '../ComponentAdmin/CSS/CreatArticle.css'

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
            <div >
                <Jumbotron>
                {this.renderRedirect()}
                    <h2>Creer votre Article ici!</h2>
                    <Form onSubmit={this.buttonsubmit}>
                    <Form.Group controlId="formBasictitre">

                        <Form.Label className='titre'>Titre</Form.Label>
                        <Form.Control className='text2' type="text" placeholder="Enter titre" onChange={this.inputtitre} />
                        
                    </Form.Group>

                    <Form.Group controlId="formBasicparagraphe">
                        <Form.Label className='para'>Paragraphe</Form.Label>
                        <Form.Control className="text2" as="textarea" placeholder="Entrez votre paragraphe" onChange={this.inputparagraphe} />
                       
                    </Form.Group>

                    
                    <Form.Group controlId="formBasicPicture">
                            <Form.Label >Image</Form.Label>
                            <Form.Control className='text3' type="texte" placeholder="Entrer une image" onChange={this.inputimage} />
                        </Form.Group> 

                    <Form.Group controlId="formBasicDate_de_publication">
                            <Form.Label className='date'> Date de cretation article</Form.Label>
                            <Form.Control className='text4' type="date" name="Date_de_publication" placeholder="Enter date de creation article" onChange={this.inputDate_de_publication} />
                            {/* <div className="errorMsg">{this.state.errors.Date_de_publication}</div> */}
                        </Form.Group>

                    <div className='boutton'>
                    <Button className='button' variant="primary" type="submit">
                        Entrer
                    </Button>
                    </div>
                    </Form>
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