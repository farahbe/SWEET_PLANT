import React from 'react';
// import Header from './Header';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


class Dashboard extends React.Component {

    render() {
        return(

            <div>

                {/* < Header /> */}
                <h1> Bienvenue sur votre Dashboard</h1>

                <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>            
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
                </Card>
            </div>
        )
    }
    
    }
      
    export default Dashboard;