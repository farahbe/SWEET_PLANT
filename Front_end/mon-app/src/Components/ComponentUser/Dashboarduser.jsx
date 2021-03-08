import React, { Component } from 'react';
import Modifierinfosuser from './Modifierinfosuser'
import '../ComponentAdmin/CSS/Container/ContainerDashboardUser.css'
import qqq from '../Images/qqq.jpg';


class Dashboarduser extends Component {
    state = {

    }

    render() {
        return(
          
            <div className='dashboarduser'>
             <h1> Votre Dashboard</h1>       
            <img class="imagedshboarduser" src={qqq} alt="plantes bananier" width="auto" height="400" /> 

             < Modifierinfosuser />
            
            </div>
        )
    }
}
export default Dashboarduser;