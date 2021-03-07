import React, { Component } from 'react';
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
//store
import { connect } from 'react-redux'
import { enregistrecommentaire } from '../../store/action/commentaires'
import Ecrirecommentaire from '../ComponentUser/Ecrirecommentaire'




class articlePage extends Component {
    state = {
        article: {},
        commentaire: [],
    }

    componentDidMount() {

        const { id } = this.props.match.params
        // On passe les props a la const id_article

        axios.get(`http://localhost:4000/admin/get_article/${id}`)
            // Recupere article + ${id_article} correspondant
            .then(res => {
                // console.log(res.data);
                this.setState({ article: res.data[0] });
                // element recoit les data de lobjet correspondant a lID envoyer 

            })

        // this.setState({ commentaire: this.props.usercommentaires })

        axios.get(`http://localhost:4000/user/commentsbypostid/${id}`)
            .then(res => {
                // console.log(res.data);
                 res.data.forEach(async (commentaire) => {
                    console.log(commentaire);
                    const user = await axios.get(`http://localhost:4000/user/user/${commentaire.id_user}`)
                    commentaire.avatar_user=user.data[0].avatar
                    commentaire.pseudo_user=user.data[0].pseudo
                    this.setState({commentaire:[...this.state.commentaire,commentaire]})
                })
                console.log(res.data);
                this.props.enregistrecommentaire(res.data)
                // element recoit les data de lobjet correspondant a lID envoyer 
                // this.setState({ commentaire: res.data });
            })
    
    }

    render() {
        return (
            <>
            
                {this.state.article && (
                    <div>
                        
                        <h1>Voici l'article selectionner</h1>

                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={this.state.article.image} />
                            <Card.Body>
                                <Card.Title>{this.state.article.Titre}</Card.Title>
                                <Card.Text>
                                    {this.state.article.paragraphe}
                                </Card.Text>
                               
                            </Card.Body>
                        </Card>

                    </div>


                )}

               <h3>commentaires</h3>
                    < Ecrirecommentaire />
                   
                {this.state.commentaire && this.state.commentaire.map((elem, i) => {
                console.log(elem);
                    return (
                         
                        <div key={elem.id_article}>
                            

                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={elem.avatar_user} />
                                <Card.Body>
                                    <Card.Title>{elem.pseudo_user}</Card.Title>
                                    <Card.Text>
                                        {elem.commentaire}
                                    </Card.Text>
                                    {/* <Button variant="primary">Go somewhere</Button> */}
                                </Card.Body>
                            </Card>

                        </div>


                    )
                }  )
    
             } </> 
        )
    }

}

const mapStateToProps = (state /*, ownPrps*/) => {
    //mapStateToProps permet de parcourir les props

    return {
        commentaire: state.commentairereducer.commentaire
    }
}

const mapDispatchToProps = { enregistrecommentaire }
//mapDispatchToProps dispatche l'action a toutes les props

export default connect(mapStateToProps,mapDispatchToProps)(articlePage);



