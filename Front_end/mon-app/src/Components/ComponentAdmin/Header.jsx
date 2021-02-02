import React from 'react'
import jwt from 'jsonwebtoken'
import { connect } from 'react-redux'
import { signinadmin, logout } from '../../store/action/admin'
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

    logOutSubmit = () => {
        this.props.logoutAdmin()
        this.props.history.push('/Home');
    }

    // stocker le token 
    componentDidMount() {

        if (localStorage.getItem("token")) {
            let decodetoken = jwt.decode(localStorage.getItem("token"))// si il y'a token, le stocker dans localstorage
            console.log("bbbbbbbb",decodetoken);
            if (decodetoken) {
                this.props.signinadmin({ id: decodetoken.id, email: decodetoken.email, token: localStorage.getItem("token") })
                this.setState({ decoded: decodetoken })
                //Si decode token est un token admin le stocker dans store
            }

        }
    }

    componentDidUpdate() {
        if (localStorage.getItem("token") && this.state.decoded === {}) {
            let decodetoken = jwt.decode(localStorage.getItem("token"))// si il y'a token, le stocker dans localstorage
            console.log("bbbbbbbb",decodetoken);
            if (decodetoken) {
                this.props.signinadmin({ id: decodetoken.id, email: decodetoken.email, token: localStorage.getItem("token") })
                this.setState({ decoded: decodetoken })
                //Si decode token est un token admin le stocker dans store
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
                        {!this.props.token ? (
                            <span>
                                {/* // si il n'y a pas de token loguer ca */}

                                <li><Link to="/SignUp">S'enregistrer en tant qadmin</Link></li>
                                <li><Link to="/SignIn">Se connecter</Link></li>
                            </span>
                            // sinon loguer ca
                        ) : (
                                <span>
                                    <li><Link to="/Home">Je suis un admin</Link></li>
                                    <li><Link to="/Dashboard">Dashboard</Link></li>
                                    <li><Link to="/CreateArticle">CreateArticle</Link></li>
                                    <li onClick={this.logout}>Logout</li>

                                </span>
                            )}

                    </ul>


                </div>
            )

        //-------------USER

        } else if (this.state.decoded.user === true) {
            return (
                <span>
                <li><Link to="/Home">Page d'Accueil</Link></li>
                <li onClick={this.logout}>Logout</li>

            </span>
            )
        } else {
            return (
                <div>
                    <ul>
                        {/* recupere le token contenue dans le state du store */}
                        {(this.props.location.pathname == '/SignIn' || this.props.location.pathname==="/SignUp") ? (
                            <span>
                            {/* // si il n'y a pas de token loguer ca */}

                            <li><Link to="/SignUp">S'enregistrer</Link></li>
                            <li><Link to="/SignIn">Se connecter</Link></li>
                        </span>
                        ) : (
                            <span>
                            {/* // si il n'y a pas de token loguer ca */}

                            <li><Link to="/SignUpUser">S'enregistrer</Link></li>
                            <li><Link to="/SignInUser">Se connecter</Link></li>
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
