import axios from 'axios';
import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'


class Modifierinfosuser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            infosuser: [],

            pseudo: "",
            prenom: '',
            email: '',
            password:'',
            avatar:'',
        }
    }
    //---ONCHANGE
    inputpseudo = event => {
        let Pseudo = { ...this.state.infosuser, pseudo: event.target.value }
        console.log(Pseudo);
        this.setState({infosuser: Pseudo});
        
    }
    inputprenom = event => {
        let Prenom = { ...this.state.infosuser, prenom: event.target.value }
        console.log(Prenom);
        this.setState({infosuser: Prenom});
    }
    inputemail = event => {
        let Email = { ...this.state.infosuser,  email:event.target.value }
        console.log(Email);
        this.setState({infosuser: Email});
    }
    inputpassword = event => {
        let Password = { ...this.state.infosuser, password: event.target.value }
        console.log(Password);
        this.setState({infosuser: Password});
    }
    inputpavatar = event => {
        let Avatar = { ...this.state.infosuser, avatar: event.target.value }
        console.log(Avatar);
        this.setState({infosuser: Avatar});

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

axios.put(`http://localhost:4000/user/user/${id}`,modifierinfos)
        .then(res => {
            console.log(res.data);
            this.setState({ pseudo: '' });
            this.setState({ prenom: '' });
            this.setState({ email: '' });
            this.setState({ password: '' });
            this.setState({ avatar: '' });

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

        axios.get(`http://localhost:4000/user/user/${id}`)

            .then(res => {
                console.log(res.data);
                this.setState({ infosuser: res.data[0] });
            })
    }

    render() {
        return (
            <>
            {this.state.infosuser && (
            <div>
                <Jumbotron>
                    <h1> Modifier infos user</h1>

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

                        <Form.Group controlId="formBasicpassword">
                            <Form.Label>Mot de passse</Form.Label>
                            <Form.Control type="text" value={this.state.infosuser.password} onChange={this.inputpassword} />
                        </Form.Group>

                        <Form.Group controlId="formBasicavatar">
                            <Form.Label>Avatar</Form.Label>
                            <Form.Control type="picture"  value={this.state.infosuser.avatar} onChange={this.inputavatar} />
                        </Form.Group>

                        

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Jumbotron>
            </div>
        )}
        </>
        )
    }
}

export default Modifierinfosuser;