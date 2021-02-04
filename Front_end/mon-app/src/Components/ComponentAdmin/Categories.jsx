import React from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom';

//----Store
import {connect} from 'react-redux'
import {enregistrecategorie} from '../../store/action/categories'



class Categories extends React.Component {
    state = {
        categorielist: [],
    }

    componentDidMount() {
        axios.get(`http://localhost:4000/admin/getcategorie`)
                .then(res => {
                    this.setState({categorielist: res.data});

                    this.props.enregistrecategorie(res.data)

                    
                })

    }


    render() {
        return(
            <div>
                {/* {console.log(this.state.categorielist)} */}

                <h1>Categorie d'article</h1>

                {this.props.categories && this.props.categories.map((elem ,i) => {

                return(

                <div key={elem.id_nom_categorie}>

                    <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>T{elem.Nom_categorie}</Card.Title>                     
                        <Link to={`/categorie/${elem.id_nom_categorie}`}> <Button variant= "primary">Submit</Button></Link>
                    </Card.Body>
                    </Card>

                </div>
                )}

                )}

            </div>
        )
    }
}

const mapStateToProps = (state/*, ownProps*/) => {
    return {
        categories: state.categoriereducer.categories
    }
}

const mapDispatchToProps = {enregistrecategorie}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
