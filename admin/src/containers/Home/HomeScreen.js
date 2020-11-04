// @flow

import React, { Component } from 'react';

import firebase from "../../config/firebase";

class HomeScreen extends Component {


    constructor(props) {
        super(props);
        this.state = {			
			dataSource: [],      
        }
    }

    
    componentDidMount(){
      firebase.ref("/rsvpUserRegistration").on('value', querySnapShot => {
         let data = querySnapShot.val() ? querySnapShot.val() : {};
 
           let wholeArray = Object.keys(data).map(key => {
             let newArray  =  data[key];
             newArray['Id']  = key;
             return newArray;
           });    
           
         this.setState({dataSource : wholeArray});
       });
    } 
    
	

   
    render() {      
        return(<div id="page-wrapper">
        <div className="row">
            <div className="col-lg-12">
                <h1 className="page-header">List of all the participants</h1>
            </div>          
        </div>
        <table className="table table-striped table-bordered table-condensed">
            <thead>
                <tr>
                    <th width="5%">ID</th>
                    <th width="20%">Name</th>
                    <th width="5%">Age</th>
                    <th width="8%">DOB</th>
                    <th width="8%">Profession</th>
                    <th width="10%">Locality</th>
                    <th width="10%">Number Of Guests</th>
                    <th width="20%">Address</th>
                </tr>
                
            </thead>
            <tbody>

            {this.state.dataSource.length > 0  ? this.state.dataSource.map((value, index) => {
                  return( 
					<tr>
                     <td>{ index +1 }</td>
					  <td>{ value.user_name }</td>
					  <td>{ value.user_age }</td>
					  <td>{ value.user_dob }</td>
					  <td>{ value.user_profession }</td>
					  <td>{ value.user_city }</td>
					  <td>{ value.user_guest }</td>
					  <td>{ value.user_address }</td>                
					</tr>)
                })
                :
                <tr>
                    <td colSpan="8" style={{textAlign:'center'}}>No data</td>
                </tr>  
            }         
            </tbody>
        </table>
      
    </div>);
    }

}



export default HomeScreen;

