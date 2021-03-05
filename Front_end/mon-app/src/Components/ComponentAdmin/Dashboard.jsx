import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom';
import './CSS/Container/ContainerDashboard.css'

// import Button from 'react-bootstrap/Button'
//---STORE
import {connect} from 'react-redux'
import './CSS/Container/ContainerHome.css';
import './CSS/Cards/Buttonvert.css'


class Dashboard extends Component {
   
    state = {
        dashboardarticle: [],
    }


// deletearticle(id_article) {

// }

    componentDidMount() {

        this.setState({ articledashboard: this.props.article });
         // insere les data dans dashboardarticle
          
       }

    render() {
        return(
            
            <div className='toutarticle'>
                {console.log(this.state.dashboardarticle)}
                

                {this.props.article && this.props.article.map((elem, i) => {

                    return (
                      
                        <div className="carddashboard" key={elem.id_article}>
                             <Card style={{ width: '14rem' }} >
                                <Card.Img variant="top" src={elem.image} />
                                {/* Recupere image dans elem */}
                                <Card.Body className='body'>
                                    <Card.Title>{elem.Titre}</Card.Title>
                                    <Card.Text>
                                        {elem.paragraphe}
                                    </Card.Text>
                                    
                                   <Link to={`/ModifierArticle/${elem.id_article}`}> <Button className="click"  variant= "outline-dark" size='sm' outline={true}>Modifier</Button></Link>
                                    {/* ${elem.id_articles} recupere le id de la bdd et le log dans URL ETAPE 2 */ } 
                                    
                                </Card.Body>
                               
                            </Card>
                        </div>
                    )
                }
            
        )}
    </div>
        )}
}
   
const mapStateToProps = (state /*, ownPrps*/) => {
    //mapStateToProps permet de parcourir les props

    return {
        article: state.articlereducer.article
    }
}


export default connect(mapStateToProps)(Dashboard);