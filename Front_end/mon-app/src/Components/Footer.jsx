import React, { Component } from 'react';
import './ComponentAdmin/CSS/Footer.css'
import LogoSweetPlant from './Images/LogoSweetPlant.png'


class Footer extends Component {

    render() {
        return (
            <footer>
            <div className='contain'>
                <img className="LogoSweetPlant" src={LogoSweetPlant} alt="Logo" width="60" height="50" />
                <h6> Copyright Farah Bechoual</h6>
                <h6> SWETTE PLANT </h6>
                
            </div>
            </footer>


        )
    }
}

export default Footer;