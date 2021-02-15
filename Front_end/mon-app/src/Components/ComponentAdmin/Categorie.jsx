import axios from 'axios';
import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { connect } from 'react-redux'

class articlescategorie extends React.Component {

    state = {
        articlesdelacategorie: [],
    }

    componentDidMount() {
        // console.log(this.props.article);


        // axios.get(`http://localhost:4000/admin/getcategorie/${id}`)
        //     .then(res => {
        //         this.setState({articlesdelacategorie: res.data });
        //         console.log(res.data);


        //     })
    }


    render() {
        // console.log(this.state.articlesdelacategorie);
        console.log(this.props.article);

        const { id } = this.props.match.params
        let tableau = this.props.article.filter(elem => elem.id_categorie == id)
        // this.setState({ articlesdelacategorie: this.props.article.filter(elem => elem.id_categorie == id) });
        console.log(tableau);
        return (
                  
                    <div>
                            <h1>la categorie blabla</h1>
                {tableau.length && tableau.map(elem => {
                    return (
                  

                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={elem.image} />
                                <Card.Body>
                                    <Card.Title>{elem.Titre}</Card.Title>
                                    <Card.Text>
                                        {elem.paragraphe}
                                    </Card.Text>
                                    <Button variant="primary">Go somewhere</Button>
                                </Card.Body>
                            </Card>

                    )
                })
               

            }
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

export default connect(mapStateToProps)(articlescategorie);
