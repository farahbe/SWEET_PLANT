import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Jumbotron from 'react-bootstrap/Jumbotron'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
//------STORE--------
import { connect } from 'react-redux';
import { creatstorearticle } from '../../store/action/ajout_article';// const dans l'action
import './CSS/Container/ContainerCreatArticle.css'
import lll from '../Images/lll.jpg'


class CreateArticle extends Component {
    state = {
        
    selectedFile: null, 
     titre: '',
      paragraphe: '',
      image: '',
    //   Date_de_publication: '',
      categorie:0,
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

    inputcategorie = event => {
        this.setState({ categorie: event.target.value });
    }
    // inputdatedepublication = event => {
    //     this.setState({ Date_de_publication: event.target.value });
    // }
    

    
    //onSubmit
    buttonsubmit = event => {
        event.preventDefault();


        const article = {
            titre: this.state.titre,
            paragraphe: this.state.paragraphe.replaceAll("'"," "),
            image: this.state.image,
            // Date_de_publication: this.state.Date_de_publication,
            id_categorie: this.state.categorie,
            id_admin: this.props.id
           
        };

        
        axios.post('http://localhost:4000/admin/articles',article, {headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }})
        //{headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }} recupere le header du token dans le Adminconnect
        .then(res => {
            console.log(res.data);
            // console.log(res.data);
            this.setState({titre:''});
            this.setState({paragraphe:''});
            this.setState({image:''});
            // this.setState({Date_de_publication:''});
           //Modifie les donnees et les rboots avec ""


            //Creation du store pour ajouter un article ajout de la const dans le store action
           this.props.creatstorearticle(article)

        //    this.setRedirect();
           //Redirige vers Dashboard
    })
    .catch(error => {
        console.error(error)
    })
}

    render() {
        console.log(this.props.token);
        return(
        <div className="divcreatarticle">
        
        
            <div>
            <img class="imagecreatarticle" src={lll} alt="plantes bananier" width="auto" height="400" /> 

                <Jumbotron>
                <h2>CREER VOTRE ARTICLE</h2>
                {this.renderRedirect()}
                    
                    <Form className='carte' onSubmit={this.buttonsubmit}>
                    <Form.Group controlId="formBasictitre">

                        
                        <Form.Control className='text1' placeholder="Titre" type="text"  onChange={this.inputtitre} />
                        
                    </Form.Group>

                    <Form.Group controlId="formBasicparagraphe">
                       
                        <Form.Control className="text2" as="textarea" placeholder="Paragraphe" onChange={this.inputparagraphe} />
                       
                    </Form.Group>

                    
                    <Form.Group controlId="formBasicPicture">
                        
                            <Form.Control className='text3' type="texte"  placeholder="Image"  onChange={this.inputimage} />
                        </Form.Group> 

                    {/* <Form.Group controlId="formBasicDate_de_publication">
                           
                            <Form.Control className='text4' type="date"name="Date_de_publication"  onChange={this.inputdatedepublication} />
                            {/* <div className="errorMsg">{this.state.errors.Date_de_publication}</div> */}
                        {/* </Form.Group> */} 

                        <Form.Group controlId="formBasicCategorie">
                        
                            <Form.Control className='text3' type="Number"  placeholder="Categorie Id"  onChange={this.inputcategorie} />
                        </Form.Group> 

                    <div className='bouttonform'>
                    <Button className='click' variant="primary" type="submit">
                        Entrer
                    </Button>
                    </div>
                    </Form>
                </Jumbotron>
            </div>
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


