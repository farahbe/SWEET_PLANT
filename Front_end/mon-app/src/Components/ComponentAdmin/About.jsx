import React from 'react'
import './CSS/About.css';
import Aboutimage from '../Images/Aboutimage.png';



function About() {
    return (

        <div>
            <h1>About</h1>

            <div class='image'>
            <p class = 'txt1'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.Inventore sit error eos quisquam, 
                corporis vel eligendi, delectus cum magnam ipsam itaque beatae nemo deleniti. Nam officia 
                beatae et maxime aliquam.</p>
                <p class="txt2">Lorem ipsum, dolor sit amet consectetur adipisicing elit.Inventore sit error eos quisquam, 
                corporis vel eligendi, delectus cum magnam ipsam itaque beatae.</p>
                <img class="imageplante" src={Aboutimage} alt="plantes patio" width="350" height="550"/>
            </div>
           
           </div>

     
    )
}

export default About;
