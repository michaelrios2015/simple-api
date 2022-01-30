import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { ListItem } from '@mui/material';

class App extends Component{
  constructor(){
    super();
    this.state = {
      users: [],
      loading: true
    };
  }
  async componentDidMount(){
    const data = (await axios.get('/api/users')).data
    this.setState({
      users: data,
      loading: false
    });

  }
  render(){
    const { users, loading } = this.state;
    if(loading){
      return '....loading';
    }
    console.log(users);
    return (
      <ul>
        {
          users.map( user => { 
            return (
              <li key = {user.facilityname} >
               <b>Name:</b>&nbsp; {user.facilityname}
              <br></br> 
               <b>Adress:</b>&nbsp; {user.facilityaddress}  
               <br></br> 
              </li>
            );
          })
        }
      </ul>
    );
  }
}

render(<App />, document.querySelector('#root'));