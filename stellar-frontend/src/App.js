import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './containers/Home.js';
import Login from './containers/Login.js';
import Signup from './containers/Signup.js'
import Project from './containers/Project.js';
import { Component } from 'react';
import NavBar from './components/NavBar.js'
import { BrowserRouter as Router, Route, Redirect, withRouter } from 'react-router-dom'
import NewProject from './containers/NewProject';


export default class App extends Component {

  constructor() {
    super();
    this.state = {
      apodImg: '',
      results: [],
      projects: [],
      isLoggedIn: false,
      currentUser: null,
      currentProject: null
    }
  }

  componentDidMount() {
    //Should return apod image and list of projects
    fetch("http://localhost:3000/resources/init")
      .then(res => res.json())
      .then(data => {
        this.setState({
          apodImg: data.apod,
          projects: data.projects
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
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(session)
    })
      .then(res => res.json())
      .then(userInfo => {
        if (!userInfo.error) {
          localStorage.token = userInfo.jwt
          this.setState({
            isLoggedIn: true,
            currentUser: userInfo.user,
            currentProject: this.findCurrentProject(userInfo.user)
          })
        }
        else { console.log(userInfo) }
      })
  }

  findCurrentProject = (user) => {
    return (this.state.projects.filter(project => project.id === user.project_id))[0]
  }

  signup = (e) => {
    e.preventDefault();
    let newUser = {
      username: e.target[0].value,
      password: e.target[1].value,
      project_id: e.target[2].value,
    }
    console.log(newUser)
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(userInfo => {
        if (!userInfo.error) {
          localStorage.token = userInfo.jwt
          this.setState({
            isLoggedIn: true,
            currentUser: userInfo.user,
            currentProject: this.findCurrentProject(userInfo.user)
          })
        }
        else { console.log(userInfo) }
      })
  }

  logout = () => {
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
          "Accept": "application/json",
          'Authorization': `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({
          searchTerm: searchTerm
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
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

  newProject = (e) => {
    console.log(this.props.history)
    e.preventDefault();
    let newProject = {
      title: e.target[0].value,
      description: e.target[1].value,
    }
    console.log(newProject)
    fetch('http://localhost:3000/projects', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newProject)
    })
    .then(res => res.json())
    .then(newProject=> {
      this.setState({
      projects:[...this.state.projects,newProject.project]
      })
      window.history.back();}
    )
  }

  render() {
    //We have 2 routers -- one for logged in, and one for logged out 
    // in logged out -> '/' is log in component
    // in logged in -> '/' is the home page 

    if (this.state.isLoggedIn === true) {
      return (
        <Router>
          <div>

            <NavBar logout={this.logout} />

            {/* Covers routing from logged out Router */}
            <Route path='/signup' render={routerProps => <Redirect to="/"/>}/>

            <Route exact path='/' render={routerProps =>
              <Home
                apodImg={this.state.apodImg}
                searchChange={this.searchChange}
                results={this.state.results}
              />} />

            <Route exact path='/project' component={() => <Project project={this.state.currentProject}/>}/>
          </div>
        </Router>
      )
    } else {
      return (
        <Router>
          <div> 
            {/* Covers routing from logged in Router*/}
            <Route exact path='/login' render={routerProps => <Redirect to="/" />} />

            <Route exact path='/signup' render={routerProps => <Signup
             signup={this.signup}
             projects={this.state.projects}
             apodImg={this.state.apodImg}
             />}/>

            <Route exact path='/' render={routerProps => <Login
              login={this.login}
              apodImg={this.state.apodImg}
            />}/>

            <Route exact path='/newproject' component={()=><NewProject 
            newProject={this.newProject}
            apodImg={this.state.apodImg}
            />}/>
          </div>
        </Router>
      )
    }
  }
}

