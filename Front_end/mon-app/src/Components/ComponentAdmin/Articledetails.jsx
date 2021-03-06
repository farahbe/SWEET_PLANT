import React, { Component } from 'react';
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
//store
import { connect } from 'react-redux'
import { enregistrecommentaire } from '../../store/action/commentaires'
import Ecrirecommentaire from '../ComponentUser/Ecrirecommentaire'
import './CSS/Container/ContainerArticleSelectionner.css'
import './CSS/Image/ImageUser.css'




class articlePage extends Component {
    state = {
        article: {},
        commentaire: [],
    }

    componentDidMount() {

        const { id } = this.props.match.params
        // id represente les parametres de l'id url

        axios.get(`http://localhost:4000/admin/get_article/${id}`)
            // Recupere article demander grace  ${id_article} 
            .then(res => {
                // console.log(res.data);
                this.setState({ article: res.data[0] });
                // element recoit les data de lobjet correspondant a lID envoyer 

            })

        // this.setState({ commentaire: this.props.usercommentaires })

        axios.get(`http://localhost:4000/user/commentsbypostid/${id}`)
        //recupere tout les commentaires qui appartiennent a l'article
            .then(res => {
               
                //savoir qui a poster
                 res.data.forEach(async (commentaire) => {
                     //pour chaque commentaire
                    console.log(commentaire);
                    const user = await axios.get(`http://localhost:4000/user/user/${commentaire.id_user}`,{headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }})
                    // recupere a la route user id du user (bdd)
                    commentaire.avatar_user=user.data[0].avatar //envoie l'avatar
                    commentaire.pseudo_user=user.data[0].pseudo //envoie le pseudo
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
                    <div className='articleselectionner'>
                        
                        <Card classname='cardarticle' style={{ width: '18rem' }}>
                      
                            
                            <Card.Body>
                                <Card.Title>{this.state.article.Titre}</Card.Title>
                                <Card.Img variant="top" src={this.state.article.image} />
                                <Card.Text>
                                    {this.state.article.paragraphe}
                                </Card.Text>
                               
                            </Card.Body>
                        </Card>

                    </div>


                )}

              
                    < Ecrirecommentaire />
                   <h4>Commentaire</h4>
                {this.state.commentaire && this.state.commentaire.map((elem, i) => {
                console.log(elem);
                    return (
                         
                        <div  key={elem.id_article}>
                            
                            <Card style={{ width: '18rem' }}>
                                <Card.Img  className='userimage' variant="top"  src={elem.avatar_user}  />
                                <Card.Body  className='cardarticleselectionner'>
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



