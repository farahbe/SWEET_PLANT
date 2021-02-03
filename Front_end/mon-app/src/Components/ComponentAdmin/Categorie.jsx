import React from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { con } from '../../../../../Back_end/Database/DB'
import {Link} from 'react-router-dom';

class Categorie extends React.Component {

    state = {
        categorielist: [],
    }


    componentDidMount() {

        // On recupere la liste entiere
        axios.get(`http://localhost:4000/categorie`)
            .then(res => {
                this.setState({ categorielist: res.data });
                // insere les data dans categorielist

                this.props.enregistreProducts(res.data)
                // enregistre les data dans la props 'enregistreProducts'

            })
    }



    render() {
        return (
            <div>
                {console.log(this.state.categorielist)}
                {/* log les produits contenue dans le tableau categorielist */}


                {this.props.article && this.props.article.map((elem, i) => {
                    // parcours le tableau article dans le reducer grace a .map et insere dans elem et le products de reducer

                    return (

                        <div key={elem.id_article} >
                            {/* Integre a la div du template le id qui figure dans l'element grace a la key */}

                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={elem.image} />
                                {/* Recupere image dans elem */}
                                <Card.Body>
                                    <Card.Title>{elem.Titre}</Card.Title>
                                    <Card.Text>
                                        {elem.paragraphe}
                                    </Card.Text>
                                    <Link to={`/articles/${elem.id_article}`}> <Button variant= "primary"  >Submit</Button></Link>
                                    {/* ${elem.id_articles} recupere le id de la bdd et le log dans URL ETAPE 2 */ } 

                                </Card.Body>
                            </Card>
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

const mapDispatchToProps = {ajout_article}
    //mapDispatchToProps dispatche l'action a toutes les props

export default con(mapStateToProps, mapDispatchToProps)(Categorie);
