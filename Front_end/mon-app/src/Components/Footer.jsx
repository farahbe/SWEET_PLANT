import React, { Component } from 'react';
import './ComponentAdmin/CSS/Footer.css'
import LogoSweetPlant from './Images/LogoSweetPlant.png'


class Footer extends Component {

    render() {
        return (
            <footer>
            <div class='footer'>
                <img class="LogoSweetPlant" src={LogoSweetPlant} alt="Logo" width="100" height="80" />
                <h6> Copyright Farah Bechoual</h6>
                <h7> SWETTE PLANT </h7>
            </div>
            </footer>


        )
    }
}

export default Footer;