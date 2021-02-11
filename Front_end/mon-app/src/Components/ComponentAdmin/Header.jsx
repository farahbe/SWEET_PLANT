import React from 'react'
import jwt from 'jsonwebtoken'
import { connect } from 'react-redux'
import { signinadmin } from '../../store/action/admin'
import { Link, withRouter } from 'react-router-dom'


class headerAdmin extends React.Component {

    constructor(props) {
        super(props)
        console.log(this.props.location)}

    logout = () => {
        localStorage.clear();
        window.location.href = "/Home";
        // Clean le local storage et le renvoie a la page signin une fois cleaner
      }

    state = {
        email: '',
        password: '',
        decoded: {}
    };

    logoutSubmit = () => {
        this.props.logoutAdmin()
        this.props.history.push('/Home');
    }

    // recuperer le token dans le localstorage 
    componentDidMount() {

        if (localStorage.getItem("token")) {
            let decodetoken = jwt.decode(localStorage.getItem("token"))// decode le token
            console.log("decodetoken");
            if (decodetoken) {
                this.props.signinadmin({ id: decodetoken.id, email: decodetoken.email, token: localStorage.getItem("token") })//si token le stocker dans store
                this.setState({ decoded: decodetoken })
                //enregistre dans les state du component header
            }

        }
    }

    //appeler des que les states de mon component son modifier
    componentDidUpdate() {
        if (localStorage.getItem("token") && this.state.decoded === {}) {
            let decodetoken = jwt.decode(localStorage.getItem("token"))// si il y'a token, le stocker dans localstorage
            console.log("bbbbbbbb",decodetoken);
            if (decodetoken) {
                this.props.signinadmin({ id: decodetoken.id, email: decodetoken.email, token: localStorage.getItem("token") })
                this.setState({ decoded: decodetoken })
                
            }

        }
    }

    render() {

        //-----------------ADMIN

        // if (this.props.location.pathname==="/SignIn"||this.props.location.pathname==="/SignUp" ) { 
            //Si le chemin correspond a... alors afficher ca
console.log(this);
         if (this.state.decoded.admin === true) { //si c'est un admin

            return (

                <div>
                    <ul>
                        {/* recupere le token contenue dans le state du store */}
                       
                                <span>
                                    <li><Link to="/Home">Home</Link></li>
                                    <li><Link to="/Dashboard">Dashboard</Link></li>
                                    <li><Link to="/CreateArticle">CreateArticle</Link></li>
                                    <li><Link to="/ToutArticle">ToutArticle</Link></li>
                                    <li><Link to="/Categories">Categories</Link></li>
                                    <li onClick={this.logout}>Logout</li>


                                </span>
                            

                    </ul>


                </div>
            )

        //-------------USER

        } else if (this.state.decoded.user === true) {//si tes un user connecter
            return (
                <span>
                <li><Link to="/Home">Page d'Accueil</Link></li>
                <li onClick={this.logout}>Logout</li>

            </span>
            )
        } else {// pas connecter du tout
            return (
                <div>
                    <ul>
                        {/* recupere le token contenue dans le state du store */}
                        {(this.props.location.pathname === '/SignIn' || this.props.location.pathname==="/SignUp") ? (
                            <span>
                           
                            <li><Link to="/SignUp">S'enregistrer</Link></li>
                            <li><Link to="/SignIn">Se connecter</Link></li>
                        </span>
                        ) : (
                            <span>
                            
                            <li><Link to="/SignUpUser">S'enregistrer</Link></li>
                            <li><Link to="/SignInUser">Se connecter</Link></li>
                            <li><Link to="/ToutArticle">ToutArticle</Link></li>
                            <li><Link to="/Categories">Categories</Link></li>



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

const mapDispatchToProps = { signinadmin }

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(headerAdmin));
