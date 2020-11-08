import './App.css';
import Home from './containers/Home.js';
import Login from './containers/Login.js';
import Project from './containers/Project.js';
import { Component } from 'react';
// import {BrowserRouter, Route, Switch, NavLink} from 'react-router-dom'

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      apodImg: '',
      results: []
    }
  }

  componentDidMount() {
    fetch("http://localhost:3000/resources/apod")
      .then(res => res.json())
      .then(data => {
        this.setState({
          apodImg: data.apod
        })
      })
  }

  searchChange = (e) => {
    let searchTerm = e.target.value
    console.log(searchTerm)
    if (searchTerm != "") {
      fetch("http://localhost:3000/resources/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          searchTerm: searchTerm
        })
      })
        .then(res => res.json())
        .then(data => {
          this.setState({
            results: data
          })
        })
    }
    else{
      this.setState({
        results:[]
      })
    }
  }

  render() {
    return (
      <Home
        apodImg={this.state.apodImg}
        searchChange={this.searchChange}
        results={this.state.results}
      />
    );
  }
}

