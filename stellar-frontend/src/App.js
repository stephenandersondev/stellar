import './App.css';
import Home from './containers/Home.js';
import Login from './containers/Login.js';
import Project from './containers/Project.js';
import { Component } from 'react';
import NavBar from './components/NavBar.js'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'


export default class App extends Component {

  constructor() {
    super();
    this.state = {
      apodImg: '',
      results: [],
      isLoggedIn: false
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
    this.setState({
      isLoggedIn: true
    })
    fetch('http://localhost:3000/auth', {
      method: 'POST',
      headers: {
        "Content-Type":"application/json",
        "Accept":"application/json"
      },
      body: JSON.stringify(session)
    })
    .then(res => res.json())
    .then(res => console.log(res))
  }

  logout = () => {
    console.log("we out")
    this.setState({
      isLoggedIn: false
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
            <Route exact path='/login' render={routerProps => <Redirect to="/" />} />
            <Route exact path='/project' component={Project} />
          </div>
        </Router>
      )
    } else {
      return (<Login login={this.login} />)
    }
  }
}

