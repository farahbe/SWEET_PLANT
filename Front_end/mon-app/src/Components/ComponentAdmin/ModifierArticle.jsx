
import React, { Component } from 'react';
import axios from 'axios'
import Button from 'react-bootstrap/Button'
// import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form';
import Jumbotron from 'react-bootstrap/Jumbotron'
import { Redirect } from 'react-router-dom';
//-------STORE
import { connect } from 'react-redux';
// import { creatstorearticle } from '../../store/action/ajout_article';// const dans l'action


class ModifierArticle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            article: 0,

        titre: '',
        paragraphe: '',
        image: '',
        redirect: false

        }
    }
    
    setRedirect = () => {
        this.setState({
            redirect: true
            //Quand la redirection est TRUE cad la personne c'est logue correctement
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to="/Dashboard" />
            //Redirige vers Dashboard
        }
    }

    //Onchange
    inputtitre = event => {
        let test ={...this.state.article,Titre: event.target.value }
        console.log(test);
        this.setState({ article:{...this.state.article,Titre: event.target.value }});
    }
    inputparagraphe = event => {
        this.setState({ paragraphe: event.target.value });
    }
    inputimage = event => {
        this.setState({ image: event.target.value });
    }


    //---------DIDMOUNT
    componentDidMount() {
        console.log(this);

        const {id} = this.props.match.params 
        // On passe les props a la const id_article

        axios.get(`http://localhost:4000/admin/get_article/${id}`)
        // Recupere article + ${id_article} correspondant
        .then(res => {
            console.log(res.data);
            this.setState({article: res.data[0] });
         // element recoit les data de lobjet correspondant a lID envoyer 

        })
    }

    //onSubmit
    buttonsubmit = event => {
        event.preventDefault();

        const modifarticle = {
            titre: this.state.article.Titre,
            paragraphe: this.state.article.paragraphe,
            image: this.state.article.image,
            id_admin: this.props.id

        };

        const { id } = this.props.match.params
        // On passe les props a la const id_article

        axios.put(`http://localhost:4000/admin/articles/${id}`, modifarticle, {headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }})
            // Recupere article + ${id_article} correspondant
            .then(res => {
                console.log(res.data);
                this.setState({ titre: '' });
                this.setState({ paragraphe: '' });
                this.setState({ image: '' });

                this.setState({ article: res.data[0] });
                // element recoit les data de lobjet correspondant a lID envoyer 


                this.setRedirect();
                //Redirige vers Dashboard

            })
    }

    render() {

        
     console.log('ici');
     console.log(this.state.article);
        return (
            <>
                {this.state.article && (
                    <div>
                        <Jumbotron>
                            {this.renderRedirect()}
                            <h1>Voici l'article selectionner</h1>

                            <Form onSubmit={this.buttonsubmit}>
                                <Form.Group controlId="formBasictitre">
                                    <Form.Label>Titre</Form.Label>
                                    <Form.Control type="text" value={this.state.article.Titre} onChange={this.inputtitre} />
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

                                <Form.Group controlId="formBasicimage">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control type="picture" placeholder="Image" onChange={this.inputimage} />
                                    <Form.Text className="text-muted">
                                        Selectionnez votre image
                        </Form.Text>
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Entrer
                    </Button>
                            </Form>

                        </Jumbotron>
                    </div>
                )}
            </>
        )
    }

}


const mapStateToProps = (state /*, ownPrps*/) => {
    //mapStateToProps permet de parcourir les props

    return {
        article: state.articlereducer.article
    }
}

// const mapDispatchToProps = {ajout_article}
//mapDispatchToProps dispatche l'action a toutes les props

export default connect(mapStateToProps)(ModifierArticle);