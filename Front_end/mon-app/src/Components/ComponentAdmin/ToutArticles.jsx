import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom';
//store
import {connect} from 'react-redux'
// import {ajout_article} from '../../store/action/ajout_article'




class ToutArticles extends React.Component {

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

                <h1>Galerie d'article</h1>


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
                                    <Link to={`/Article/${elem.id_article}`}> <Button variant= "primary"  >Submit</Button></Link>
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

// const mapDispatchToProps = {ajout_article}
    //mapDispatchToProps dispatche l'action a toutes les props

export default connect(mapStateToProps)(ToutArticles);
