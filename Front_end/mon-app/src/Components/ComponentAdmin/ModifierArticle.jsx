
import React, { Component } from 'react';
import axios from 'axios'
import Button from 'react-bootstrap/Button'
// import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form';
import Jumbotron from 'react-bootstrap/Jumbotron'
import { Redirect } from 'react-router-dom';
//-------STORE
import { connect } from 'react-redux';
import './CSS/Container/ContainerModifierArticle.css'
import Alocassia from '../Images/Alocassia.jpg';
// import { creatstorearticle } from '../../store/action/ajout_article';// const dans l'action


class ModifierArticle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            article: 0,

            titre: '',
            paragraphe: '',
            image: '',
            redirect: false,
            // succesMsg: '',

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
        let Titre = { ...this.state.article, Titre: event.target.value }
        console.log(Titre);
        this.setState({ article: { ...this.state.article, Titre: event.target.value } });
    }
    inputparagraphe = event => {
        let paragraphe = { ...this.state.article, paragraphe: event.target.value }
        console.log(paragraphe);
        this.setState({ article: { ...this.state.article, paragraphe: event.target.value } });
    }
    inputimage = event => {
        let image = { ...this.state.article, image: event.target.value }
        //image recoit dans ces states l'image qui est dans le tableau article : event recupere la valeur de l'input
        console.log(image);
        this.setState({ article: { ...this.state.article, image: event.target.value } });
    }


    //---------DIDMOUNT
    componentDidMount() {
        // -------Recuperer l'article selectionnne
        console.log(this);

        const { id } = this.props.match.params
        // On passe les props a la const id_article

        axios.get(`http://localhost:4000/admin/get_article/${id}`)
            // Recupere article + ${id_article} correspondant
            .then(res => {
                console.log(res.data);
                this.setState({ article: res.data[0] });
                // element recoit les data de lobjet correspondant a lID envoyer 

            })

    }


    //onSubmit
    handlesubmit = event => {
        event.preventDefault();

        const modifarticle = {
            titre: this.state.article.Titre,
            paragraphe: this.state.article.paragraphe,
            image: this.state.article.image,
            id_admin: this.props.id

        };
        console.log(modifarticle);


        //--------------- PUT
        const { id } = this.props.match.params
        // On passe les props a la const id_article

        axios.put(`http://localhost:4000/admin/articles/${id}`, modifarticle, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            // Recupere article + ${id_article} correspondant
            .then(res => {
                console.log(res.data);
                this.setState({ titre: '' });
                this.setState({ paragraphe: '' });
                this.setState({ image: '' });

                // ----REDIRECT
                this.setRedirect();
                //Redirige vers Dashboard


                if (res.status === 200) {
                    console.log(res);
                    console.log(res.data);
                    // this.setState({ msgSuccess: "Produit modifié avec succès" })

                    this.setState({ article: res.data[0] });
                    // element recoit les data de lobjet correspondant a lID envoyer 

                }
                

            })


    }
    //----- FUNCTION DELETE
    deleteRow = (id) => {


        axios.delete(`http://localhost:4000/admin/articles/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            .then(res => {
                console.log(res);
                console.log(res.data);

                this.setRedirect();


            })
    }




    render() {



        console.log(this.state.article);
        return (
            <>
                {this.state.article && (

                    <div className='modifierarticle'>
                        <img class="imagedshboarduser" src={Alocassia} alt="plantes bananier" width="auto" height="400" />

                        <Jumbotron>
                            <h1>Voici l'article selectionner</h1>
                            {/* <h5>{this.state.successMsg}</h5> */}

                            {this.renderRedirect()}

                            <Form onSubmit={this.handlesubmit}>
                                <Form.Group controlId="formBasictitre">
                                    <Form.Label>Titre</Form.Label>
                                    <Form.Control type="text" value={this.state.article.Titre} onChange={this.inputtitre} />
                                    <Form.Text className="text-muted">
                                        Entrez un titre a votre article
                        </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="formBasicparagraphe">
                                    <Form.Label>Paragraphe</Form.Label>
                                    <Form.Control as="textarea" value={this.state.article.paragraphe} onChange={this.inputparagraphe} />
                                    <Form.Text className="text-muted">
                                        Entrez votre paragraphe
                        </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="formBasicimage">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control type="picture" value={this.state.article.image} onChange={this.inputimage} />
                                    <Form.Text className="text-muted">
                                        Selectionnez votre image
                        </Form.Text>
                                </Form.Group>

                                <div className='bouttonform'>
                                    <Button className="click" variant="primary" type="submit">
                                        Modifier
                        </Button>
                                </div>
                           
                        </Form>
                           
                            <div className='bouttonform'>
                                <Button className="click" variant="primary" onClick={() => { this.deleteRow(this.state.article.id_article) }}>
                                    Supprimer
                                </Button>
                            </div>
                           
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
