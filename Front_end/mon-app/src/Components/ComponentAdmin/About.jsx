import React from 'react'
//----CSS
import './CSS/About.css';
import Aboutimage from '../Images/Aboutimage.png';



function About() {
    return (

        <div>
            <h1>About</h1>

            <div className='image'>
            <p className = 'txt1'>Sweet Plant est née de l'envie de créer un blog communautaire sur le partage et l'échange. C'est votre communauté. 
            Vous pouvez nous contacter sur les réseaux sociaux ou nous sommes très actifs. En effet Sweet Plant c'est d'abord fait connaître sur 
            les réseaux grâce à nos vidéos tutos par exemples ainsi que nos concours.</p>
                <p className="txt2">Puis avec le temps la communauté s'est agrandie et nous voila aujourd'hui a plus de 100 000 abonnés sur notre chaine youtube.
                 Un grand merci à vous. N'hésitez pas à cliquer sur les liens et nous laisser un message sur notre page.</p>
                <img className="imageplante" src={Aboutimage} alt="plantes patio" width="350" height="550"/>
            </div>
           
           </div>

     
    )
}

export default About;
