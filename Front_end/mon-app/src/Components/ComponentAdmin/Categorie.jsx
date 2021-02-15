import axios from 'axios';
import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

class articlescategorie extends React.Component {

state = {
 articlesdelacategorie: {}
}

componentDidMount() {
    console.log(this);

    const {id} = this.props.match.params

    axios.get(`http://localhost:4000/admin/getcategorie/${id}`)
        .then(res => {
            this.setState({articlesdelacategorie: res.data });
            console.log(res.data);

            
        })
}


render() {

    return(
        <>
        {this.state.articlesdelacategorie && (

        <div>
            <h1>la categorie blabla</h1>

            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={this.state.articlesdelacategorie.image} />
            <Card.Body>
                <Card.Title>{this.state.articlesdelacategorie.Titre}</Card.Title>
                <Card.Text>
                {this.state.articlesdelacategorie.paragraphe}
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
            </Card>

        </div>
    )}
    </>
    )}

} 

export default articlescategorie;
