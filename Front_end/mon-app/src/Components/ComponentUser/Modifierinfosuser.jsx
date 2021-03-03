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
        let Pseudo = { ...this.state.infosuser, Pseudo: event.target.value }
        console.log(Pseudo);
        this.setState({infosuser: {...this.state.infosuser, Pseudo: event.target.value }})
    }
    inputprenom = event => {
        let Prenom = { ...this.state.infosuser, Prenom: event.target.value }
        console.log(Prenom);
        this.setState({infosuser: {...this.state.infosuser, Prenom: event.target.value }})
    }
    inputpseudo = event => {
        let Email = { ...this.state.infosuser,  Email:event.target.value }
        console.log(Email);
        this.setState({infosuser: {...this.state.infosuser, Email: event.target.value }})
    }
    inputpseudo = event => {
        let Password = { ...this.state.infosuser, Password: event.target.value }
        console.log(Password);
        this.setState({infosuser: {...this.state.infosuser, Password: event.target.value }})
    }
    inputpseudo = event => {
        let Avatar = { ...this.state.infosuser, Avatar: event.target.value }
        console.log(Avatar);
        this.setState({infosuser: {...this.state.infosuser, Avatar: event.target.value }})
    }

    //----ONSUBMIT
    handlesubmit = event => {
        event.preventDefault();

        const modifierinfos = {
            pseudo: this.state.infosuser.pseudo,
            prenom: this.state.infosuser.prenom,
            email: this.state.infosuser.email,
            password: this.state.infosuser.password,
            avatar: this.state.infosuser.avatar,
        }
    }



    componentDidMount() {
        // Recupere toutes les infos d'un user
        const { id } = this.props.match.params

        axios.get(`http://localhost:4000/user/user/${id}`)

            .then(res => {
                console.log(res.data);
                this.setState({ infosuser: res.data[0] });
            })
    }








    render() {
        return (
            <div>
                <Jumbotron>
                    <h1> Modifier infos user</h1>

                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                        </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Jumbotron>
            </div>
        )
    }
}

export default Modifierinfosuser;