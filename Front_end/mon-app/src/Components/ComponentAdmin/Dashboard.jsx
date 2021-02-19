import React from 'react';
import Table from 'react-bootstrap/Table'
// import Button from 'react-bootstrap/Button'
//---STORE
// import {connect} from 'react-redux'

class Dashboard extends React.Component {
    constructor (props) {

    super (props)

    this.state = {
        dashboardarticle: []
    }
}

deletearticle(id_article) {

}

    componentDidMount() {

        this.setState({ articledashboard: this.props.article });
         // insere les data dans articlelist
          
       }


    render() {
        console.log(this.state.articledashboard)
        return(

            <div>
                <h1> Bienvenue sur votre Dashboard</h1>
               {this.props.article && this.props.article.map((elem, i) => {


                return(
                    <div key={elem.id_article}>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Id</th>
                        <th>Titre</th>
                        <th>Paragraphe</th>
                        <th>Image</th>
                        <th>Modifier</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        </tr>
                        <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td>@fat</td>
                        </tr>
                        <tr>
                        <td>3</td>
                        <td colSpan="2">Larry the Bird</td>
                        <td>@twitter</td>
                        <td>@twitter</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
                )
        }
        )}
    </div>
    )
    
    }
        }
      
    export default Dashboard;