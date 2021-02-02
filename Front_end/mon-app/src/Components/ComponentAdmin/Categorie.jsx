import React from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
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
     return(
         <div>

         </div>
     )
 }
}

 export default Categorie;