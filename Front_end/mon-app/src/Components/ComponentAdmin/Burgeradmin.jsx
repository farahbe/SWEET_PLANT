// import React, { Component } from 'react';
// import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBCollapse, MDBContainer,
// MDBHamburgerToggler } from 'mdbreact';
// import { BrowserRouter as Router } from 'react-router-dom';
// // import { Link, withRouter } from 'react-router-dom'
// // import About from './About'


// class NavbarPage extends Component {
// state = {
//   collapse1: false,
//   collapseID: ''
// }

// toggleCollapse = collapseID => () => {
//   this.setState(prevState => ({ collapseID: (prevState.collapseID !== collapseID ? collapseID : '') }));
// }

// toggleSingleCollapse = collapseId => {
//   this.setState({
//     ...this.state,
//     [collapseId]: !this.state[collapseId]
//   });
// }

// render() {
//   return (
//     <Router>
        
//       <MDBContainer>
//         <MDBNavbar color="white" style={{ marginTop: '20px' }} light>
//           <MDBContainer>
//             <MDBNavbarBrand>
//               SweetPlant
//             </MDBNavbarBrand>
//             <MDBHamburgerToggler color="#d3531a" id="hamburger1" onClick={()=> this.toggleSingleCollapse('collapse1')} />
//               <MDBCollapse isOpen={this.state.collapse1} navbar>
//                 <MDBNavbarNav left>
//                   <MDBNavItem active>
//                     <MDBNavLink to="/About">About</MDBNavLink>
//                   </MDBNavItem>
//                   <MDBNavItem>
//                     <MDBNavLink to="#!">Link</MDBNavLink>
//                   </MDBNavItem>
//                   <MDBNavItem>
//                     <MDBNavLink to="#!">Profile</MDBNavLink>
//                   </MDBNavItem>
//                 </MDBNavbarNav>
//               </MDBCollapse>
//           </MDBContainer>
//         </MDBNavbar>
//       </MDBContainer>
//     </Router>
//     );
//   }
// }

// export default NavbarPage;