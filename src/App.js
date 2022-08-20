import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/layout/Navbar';
import Search from './Components/users/Search';
import Alert from './Components/layout/Alert';
import axios from 'axios';
import Users from './Components/users/Users';


class App extends Component{

  state = {
    users:[],
    loading: false,
    alert: null
  }


  // async componentDidMount(){

  //   this.setState({loading: true });

  //   const res = await axios
  //   .get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID} & client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  //   this.setState({ users: res.data, loading: false });
  // };


  // search users on github
  searchUsers = async text => {
    this.setState({loading: true });

    const res = await axios
    .get(`https://api.github.com/search/users?q=${ text }&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID} & client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ users: res.data.items, loading: false });
  }

  //clear users from state
  clearUsers = () => {
    this.setState({ users: [], loading: false });
  }

  // set alret
  setAlert = (msg,type) => {
    this.setState({alert: {msg, type}});
    setTimeout(() => this.setState({alert: null}),)
  }

  render () {

    const {loading, users} = this.state;

    return (
      <Router>
       <div className="App">
       <Navbar />
       <div className='container'>
       <Alert alert = {this.state.alert} />
       <Routes>
         <Route exat path ='/' render = {props => (
           <Fragment>
           <Search searchUsers = {this.searchUsers} clearUsers = {this.clearUsers} showClear = { users.length > 0 ? true: false } setAlert = { this.setAlert } />
           <Users loading = {loading} users = {users} />
           </Fragment>
         )}/>
       </Routes>
       </div>
      </div>
      </Router>
    );
  }
}

export default App;