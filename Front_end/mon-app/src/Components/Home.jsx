import React, { Component } from 'react';
// import Nav from "./ComponentAdmin/Nav"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom';
import CardDeck from 'react-bootstrap/CardDeck'
//------Images
import bananier from '../Components/Images/bananier.jpg';
//store
import {connect} from 'react-redux'
// import {ajout_article} from '../../store/action/ajout_article'

class Home extends Component {
    state = {
        articlelist: [],
    }


    componentDidMount() {

     this.setState({ articlelist: this.props.article });
      // insere les data dans articlelist

       
    }

    render() { 
        console.log(this.state.articlelist)

        
        return (
            
            <div>
               
                {/* log les produits contenue dans le tableau categorielist */}

                <img class="imagehead" src={bananier} alt="plantes bananier" width="1000" height="300"/>


                {this.props.article && this.props.article.map((elem, i) => {
                 // parcours le tableau article dans le reducer grace a .map et insere dans elem et le products de reducer

                    return (

                        <div key={elem.id_article} >
                            {/* Integre a la div du template le id qui figure dans l'element grace a la key */}

                          

<CardDeck>
  <Card>
    <Card.Img variant="top" src="holder.js/100px160" />
    <Card.Body>
      <Card.Title>{elem.Titre}</Card.Title>
      <Card.Text>
         {elem.paragraphe}                        
        </Card.Text>
        <Link to={`/Article/${elem.id_article}`}> <Button variant= "primary"  >Submit</Button></Link>
                           
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Last updated 3 mins ago</small>
    </Card.Footer>
  </Card>
</CardDeck>
                        </div>
                    )
                }
                )}


            </div>
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

export default connect(mapStateToProps)(Home);
