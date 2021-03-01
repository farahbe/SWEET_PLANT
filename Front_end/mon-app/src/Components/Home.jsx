import React, { Component } from 'react';
// import Nav from "./ComponentAdmin/Nav"
import Card from 'react-bootstrap/Card'
// import Button from 'react-bootstrap/Button'
// import { Link } from 'react-router-dom';
import CardColumns from 'react-bootstrap/CardColumns'
//-----CSS
import './ComponentAdmin/CSS/Home.css'
//------Images
import bananier from '../Components/Images/bananier.jpg';
//store
import { connect } from 'react-redux'
// import {ajout_article} from '../../store/action/ajout_article'


class Home extends Component {
    state = {
        articlelist: [],
    }


    componentDidMount() {


        this.setState({ articlelist: this.props.article });
        // insere les data dans articlelis
    }

    render() {
        console.log(this.state.articlelist)


        return (
            <div>
                <header className='header'>
                    <img class="imagehead" src={bananier} alt="plantes bananier" width="750" height="300" />
                </header>


                <div className='jpp'>
                    <CardColumns>
                        {this.props.article && this.props.article.map((elem, i) => {
                            // parcours le tableau article dans le reducer grace a .map et insere dans elem et le products de reducer

                            return (

                                <Card className='cardHome p-4' >

                                    <Card.Img variant="top" src={elem.image} />
                                    <Card.Body>
                                        <h2 className='titrecard'><Card.Title>{elem.Titre}</Card.Title></h2>
                                        <Card.Text>
                                            {elem.paragraphe.slice(0, 2)}...
                                            </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <small className="text-muted">Last updated 3 mins ago</small>
                                    </Card.Footer>
                                </Card>

                            )
                        }
                        )}
                    </CardColumns>

                </div>

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
