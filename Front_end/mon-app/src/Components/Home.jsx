import React, { Component } from 'react';
// import Nav from "./ComponentAdmin/Nav"
import Card from 'react-bootstrap/Card'

import CardColumns from 'react-bootstrap/CardColumns'
//-----CSS
import './ComponentAdmin/CSS/Home.css'
//------Images
import green from '../Components/Images/green.jpeg';
//store
import { connect } from 'react-redux'
// import {ajout_email} from '../store/action/newsletter'
//-----import component
import Newsletter from './ComponentUser/Newsletter'




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
                    <img class="imagehead" src={green} alt="plantes bananier" width="1100" height="400" />
                </header>


                <div className='jpp'>
                    <CardColumns>
                        {this.props.article && this.props.article.map((elem, i) => {
                            // parcours le tableau article dans le reducer grace a .map et insere dans elem et le products de reducer

                            return (

                                <Card className='cardHome p-4' >


                                    <Card.Body>
                                        <h2 className='titrecard'><Card.Title>{elem.Titre}</Card.Title></h2>
                                        <Card.Img variant="top" src={elem.image} />
                                        <p className='paragraphe'><Card.Text>
                                            {elem.paragraphe.slice(0, 22)}...
                                            </Card.Text></p>
                                    </Card.Body>
                                    <hr></hr>
                                    <Card.Text> 0 comment</Card.Text>
                                 
                                </Card>

                            )
                        }
                        )}
                    </CardColumns>
                    < Newsletter />

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

// const mapDispatchToProps = {ajout_email}
//mapDispatchToProps dispatche l'action a toutes les props

export default connect(mapStateToProps,)(Home);
