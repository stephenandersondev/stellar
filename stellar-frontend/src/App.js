import './App.css';
import Home from './containers/Home.js';
import Login from './containers/Login.js';
import Signup from './containers/Signup.js'
import Project from './containers/Project.js';
import { Component } from 'react';
import NavBar from './components/NavBar.js'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'


export default class App extends Component {

  constructor() {
    super();
    this.state = {
      apodImg: '',
      results: [],
      isLoggedIn: false,
      currentUser: null
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

  login = (e) => {
    e.preventDefault();
    let session = {
      username: e.target[0].value,
      password: e.target[1].value
    }
    fetch('http://localhost:3000/auth', {
      method: 'POST',
      headers: {
        "Content-Type":"application/json",
        "Accept":"application/json"
      },
      body: JSON.stringify(session)
    })
    .then(res => res.json())
    .then(userInfo => {
      if(!userInfo.error){
      localStorage.token = userInfo.jwt
      this.setState({
        isLoggedIn: true,
        currentUser: userInfo.user
      })
      }
      else{console.log(userInfo)}
    })
  }

  signup = (e) => {
    e.preventDefault();
    let newUser = {
      username: e.target[0].value,
      password: e.target[1].value
    }
    this.setState({
      isLoggedIn: true
    })
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        "Content-Type":"application/json",
        "Accept":"application/json"
      },
      body: JSON.stringify(newUser)
    })
    .then(res => res.json())
    .then(userInfo => {
      if(!userInfo.error){
      localStorage.token = userInfo.jwt
      this.setState({
        isLoggedIn: true,
        currentUser: userInfo.user
      })
      }
      else{console.log(userInfo)}
    })
  }

  logout = () => {
    console.log("we out")
    localStorage.token = null
    this.setState({
      isLoggedIn: false,
      currentUser: null,
    })
  }

  searchChange = (e) => {
    let searchTerm = e.target.value
    console.log(searchTerm)
    if (searchTerm !== "") {
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
    else {
      this.setState({
        results: []
      })
    }
  }

  render() {
    if (this.state.isLoggedIn === true) {
      return (
        <Router>
          <div>
            <NavBar logout={this.logout}/>
            <Route exact path='/' render={routerProps =>
              <Home
                apodImg={this.state.apodImg}
                searchChange={this.searchChange}
                results={this.state.results}
              />} />
            <Route exact path='/login' render={routerProps => <Login login={this.login} />} />
            <Route exact path='/signup' render={routerProps => <Signup signup={this.signup} />} />
            <Route exact path='/project' component={Project} />
          </div>
        </Router>
      )
    } else {
      return (<Login login={this.login} />)
    }
  }
}

