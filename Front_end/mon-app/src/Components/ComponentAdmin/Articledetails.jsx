import React, { Component } from 'react';
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

class articlePage extends Component {
    state = {
        article: {}
    }

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

render() {
    return(
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
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
                </Card>
        </div>
    )}
    </>
    )
}



}

export default articlePage;



