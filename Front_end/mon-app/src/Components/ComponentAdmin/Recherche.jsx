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
                    console.log(res.data);

                    this.props.enregistrecategorie(res.data)

                    
                })

    }


    render() {  
         console.log(this.state.categorielist)

        return(
            <div>
             
                {/* log les produits contenue dans le tableau categorielist */}

                <h1>Categorie d'article</h1>

                {this.props.categories && this.props.categories.map((elem ,i) => {
                 // parcours le tableau categories dans le reducer grace a .map et insere dans elem et le categories de reducer
                return (

                <div key={elem.id_nom_categorie} >

                    <Card style={{ width: '18rem' }}>
                    <Card.Body>
                                            
                        <Link to={`/categorie/${elem.id_nom_categorie}`}><Card.Title>{elem.Nom_categorie}</Card.Title>  </Link>
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
