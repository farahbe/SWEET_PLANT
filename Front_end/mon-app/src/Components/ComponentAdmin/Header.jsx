import React from 'react'
import jwt from 'jsonwebtoken'
import { signinadmin } from '../../store/action/admin'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'

//store
import { ajout_article } from '../../store/action/ajout_article'
import { connect } from 'react-redux'
// CSS
import './CSS/Header.css'

class headerAdmin extends React.Component {

    constructor(props) {
        super(props)
        console.log(this.props.location)
    }
    state = {
        email: '',
        password: '',
        decoded: {}
    };

    logout = () => {
        localStorage.clear();
        window.location.href = "/Home";
        // Clean le local storage et le renvoie a la page signin une fois cleaner
    }

    logoutSubmit = () => {
        this.props.logoutAdmin()
        this.props.history.push('/Home');
    }

    // recuperer le token dans le localstorage 
    componentDidMount() {

        if (localStorage.getItem("token")) {
            let decodetoken = jwt.decode(localStorage.getItem("token"))// decode le token
            console.log(decodetoken);
            if (decodetoken) {
                this.props.signinadmin({ id: decodetoken.id, email: decodetoken.email, token: localStorage.getItem("token") })//si token le stocker dans store
                this.setState({ decoded: decodetoken })
                //enregistre dans les state du component header
            }

        }

        axios.get(`http://localhost:4000/admin/getarticles`)
            .then(res => {

                this.props.ajout_article(res.data)
                // j'enregistre les articles dans mon store ici

            })
    }

    //appeler des que les states de mon component son modifier
    componentDidUpdate() {
        if (localStorage.getItem("token") && this.state.decoded === {}) {
            let decodetoken = jwt.decode(localStorage.getItem("token"))// si il y'a token, le stocker dans localstorage
            console.log("bbbbbbbb", decodetoken);
            // if (decodetoken) {
            //     this.props.signinadmin({ id: decodetoken.id, email: decodetoken.email, token: localStorage.getItem("token") })
            //     this.setState({ decoded: decodetoken })

            // }

        }
    }

    render() {
        //-----------------ADMIN
        console.log(this);
        if (this.state.decoded.admin === true) { //si c'est un admin

            return (
                <div className='headerdiv'>
                    <ul>

                    <Link to="/Home"><h6>SWEET PLANT</h6></Link>
                        <span>
                            <li><Link to="/Home" className='headertitle'> Home</Link></li>
                            <li><Link to="/Dashboard" className='headertitle'>Dashboard</Link></li>
                            <li><Link to="/CreateArticle" className='headertitle'>CreateArticle</Link></li>
                            <li><Link to="/Galerie" className='headertitle'>ToutArticle</Link></li>
                            <li><Link to="/Recherche" className='headertitle'>Recherche</Link></li>
                            <li><Link to="/About" className='headertitle'>About</Link></li>

                            <li onClick={this.logout}>Logout</li>
                        </span>
                    </ul>
                </div>
            )
            //-------------USER

        } else if (this.state.decoded.user === true) {//si tes un user connecter
            return (
                <div className='headerdiv'>
                <ul>

                <Link to="/Home"><h6>SWEET PLANT</h6></Link>
                    
                <span>
                    <li><Link to="/Home" className='headertitle'>Page d'Accueil</Link></li>
                    <li><Link to="/Galerie" className='headertitle'>Galerie</Link></li>
                    <li><Link to="/Categories" className='headertitle'>Categories</Link></li>
                    <li><Link to="/About" className='headertitle'>About</Link></li>
                    <li><Link to="/Recherche" className='headertitle'>Recherche</Link></li>
                    <li onClick={this.logout}>Logout</li>


                </span>
                </ul>
                </div>
            )
        } else {// pas connecter du tout
            return (
                <div className="headerdiv">
                    <ul>
                    <Link to="/Home"><h6>SWEET PLANT</h6></Link>
                        {/* recupere le token contenue dans le state du store */}
                        {(this.props.location.pathname === '/SignIn' || this.props.location.pathname === "/SignUp") ? (
                            <span>
                                <li><Link to="/SignUp">S'enregistrer</Link></li>
                                <li><Link to="/SignIn">Se connecter</Link></li>
                            </span>
                        ) : (
                                <span>
                                    <li><Link to="/SignUpUser" className='headertitle'>S'enregistrer</Link></li>
                                    <li><Link to="/SignInUser" className='headertitle'>Se connecter</Link></li>
                                    <li><Link to="/Galerie" className='headertitle'>Galerie</Link></li>
                                    <li><Link to="/Categories" className='headertitle'>Categories</Link></li>
                                    <li><Link to="/About" className='headertitle'>About</Link></li>
                                    <li><Link to="/Recherche" className='headertitle'>Recherche</Link></li>
                                    <li onClick={this.logout}>Logout</li>
                                </span>
                            )}

                    </ul>
                </div>
            )
        }

    }
}

const mapStateToProps = (state /* ownProps*/) => {
    return {
        token: state.adminreducer.token,
        email: state.adminreducer.email
    }
}

const mapDispatchToProps = { signinadmin, ajout_article }

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(headerAdmin));
