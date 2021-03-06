import axios from 'axios';
import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import { withRouter } from 'react-router'
import { Redirect } from 'react-router-dom';
import '../ComponentAdmin/CSS/Forms/h2.css'


class Modifierinfosuser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            infosuser: [],

            pseudo: "",
            prenom: '',
            email: '',
            password: '',
            avatar: '',
            succesMsg: '',
        }
    }
    setRedirect = () => {
        this.setState({
            redirect: true
            //Quand la redirection est TRUE cad la personne c'est logue correctement
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to="/Home" />
            //Redirige vers Dashboard
        }
    }
    //---ONCHANGE
    inputpseudo = event => {
        let Pseudo = { ...this.state.infosuser, pseudo: event.target.value }
        console.log(Pseudo);
        this.setState({ infosuser: Pseudo });

    }
    inputprenom = event => {
        let Prenom = { ...this.state.infosuser, prenom: event.target.value }
        console.log(Prenom);
        this.setState({ infosuser: Prenom });
    }
    inputemail = event => {
        let Email = { ...this.state.infosuser, email: event.target.value }
        console.log(Email);
        this.setState({ infosuser: Email });
    }
    inputpassword = event => {
        let Password = { ...this.state.infosuser, password: event.target.value }
        console.log(Password);
        this.setState({ infosuser: Password });
    }
    inputpavatar = event => {
        let Avatar = { ...this.state.infosuser, avatar: event.target.value }
        console.log(Avatar);
        this.setState({ infosuser: Avatar });

    }

    //----ONSUBMIT
    handlesubmit = event => {
        event.preventDefault();

        const modifierinfos = {
            // recupere les infos qui sont dans la bdd et les met dans le tableau
            pseudo: this.state.infosuser.pseudo,
            prenom: this.state.infosuser.prenom,
            email: this.state.infosuser.email,
            password: this.state.infosuser.password,
            avatar: this.state.infosuser.avatar,
        };

        console.log(modifierinfos);
        //------PUT MODIFIER LES INFOS USER

        const { id } = this.props.match.params
        // On passe les props a la const id_article

        axios.put(`http://localhost:4000/user/user/${id}`, modifierinfos, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            .then(res => {
                console.log(res.data);
                this.setState({ pseudo: '' });
                this.setState({ prenom: '' });
                this.setState({ email: '' });
                this.setState({ password: '' });
                this.setState({ avatar: '' });

                this.setRedirect();

                if (res.status === 200) {
                    console.log(res);
                    console.log(res.data);
                    this.setState({ msgSuccess: "infos modifié avec succès" })

                    this.setState({ infosuser: res.data[0] });
                    // element recoit les data de lobjet correspondant a lID envoyer 

                }

            })

    }


    // -----RECUPERE INFOS USER
    componentDidMount() {

        const { id } = this.props.match.params

        axios.get(`http://localhost:4000/user/user/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })

            .then(res => {
                console.log(res.data);
                this.setState({ infosuser: res.data[0] });
            })
    }

    deleteRow = (id) => {


        axios.delete(`http://localhost:4000/user/user/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            .then(res => {
                console.log(res);
                console.log(res.data);
                this.setState({ msgSuccess: "Compte supprime avec succes" })



            })
        this.setRedirect();
    }

    render() {
        return (

            <>
                {this.state.infosuser && (
                    <div>

                        <Jumbotron>
                            {this.renderRedirect()}

                            <h2> MODIFIER VOS INFOS</h2>

                            <Form onSubmit={this.handlesubmit} >
                                <Form.Group controlId="formBasicpseudo">
                                    <Form.Label>Pseudo</Form.Label>
                                    <Form.Control type="text" value={this.state.infosuser.pseudo} onChange={this.inputpseudo} />
                                </Form.Group>

                                <Form.Group controlId="formBasicprenom">
                                    <Form.Label>Prenom</Form.Label>
                                    <Form.Control type="text" value={this.state.infosuser.prenom} onChange={this.inputprenom} />
                                </Form.Group>

                                <Form.Group controlId="formBasicemail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" value={this.state.infosuser.email} onChange={this.inputemail} />
                                </Form.Group>


                                <Form.Group controlId="formBasicavatar">
                                    <Form.Label>Avatar</Form.Label>
                                    <Form.Control type="picture" value={this.state.infosuser.avatar} onChange={this.inputavatar} />
                                </Form.Group>


                                <div className='boutton'>
                                    <Button className='b' variant="primary" type="submit">
                                        mODIFIER
                                    </Button>
                                </div>

                            </Form>

                            <div className='boutton'>
                                <Button className='b' variant="primary" onClick={() => { this.deleteRow(this.state.infosuser.id_user) }}>
                                    Supprimer
                                </Button>
                            </div>

                        </Jumbotron>
                    </div>
                )}
            </>
        )
    }
}

export default withRouter(Modifierinfosuser);