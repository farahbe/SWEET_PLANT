import React from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
// import {Link} from 'react-router-dom';


class Categories extends React.Component {
    state = {
        categorielist: [],
    }

    componentDidMount() {
        axios.get(`http://localhost:4000/admin/categorie`)

    }


    render() {
        return(
            <div>
                {console.log(this.state.categorielist)}
                <h1>Categorie d'article</h1>

                return(
                <div>
                    <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                    </Card>

                </div>
                )

            </div>
        )
    }
}

export default Categories;