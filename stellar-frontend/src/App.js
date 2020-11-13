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
import { Container } from 'react-bootstrap';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      apodImg: '',
      results: [],
      projects: [],
      isLoggedIn: false,
      currentUser: null,
      currentProject: null,
      currentResources: [],
      detailDisplay: false,
      detailsItem: [],
      addedItem: false
    }
  }

  componentDidMount() {
    //Should return apod image and list of projects
    fetch("http://localhost:3000/resources/init")
      .then(res => res.json())
      .then(data => {
        console.log(data)
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
            currentProject: userInfo.project,
            currentResources: userInfo.resources
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
      .then(newProject => {
        this.setState({
          projects: [...this.state.projects, newProject.project]
        })
        window.history.back();
      }
      )
  }

  deleteResource = (id, e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/resources/${id}`, {
      method: "DELETE"
    })
    let updatedList = this.state.currentResources.filter(resource => !(resource.id === id))
    let newOrder = updatedList.map((resource, index) => {
      return Object.assign({}, resource, { ord_num: (index + 1) })
    })
    this.setState({
      currentResources: newOrder
    })
    this.exitDisplay();
  }

  createResource = (item, e) => {
    e.preventDefault();
    e.target.reset();
    let newResource = {
      content: e.target.content.value,
      url: item.links[0]["href"],
      user_id: this.state.currentUser.id,
      project_id: this.state.currentProject.id,
      ord_num: this.state.currentResources.length + 1
    }
    fetch("http://localhost:3000/resources", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newResource)
    })
      .then(this.setState({
        currentResources: [...this.state.currentResources, newResource]
      }))
    this.exitDisplay()
  }

  saveResources = () => {
    const resources = this.state.currentResources
    resources.forEach(resource => {
      fetch(`http://localhost:3000/resources/${resource.id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(resource)
      })
    })
  }

  editResource = (e, id) => {
    let newContent = e.target[0].value
    let updatedResource = this.state.currentResources.filter(resource => resource.id === id)[0]
    updatedResource.content = newContent
    this.setState({
      currentResources: this.state.currentResources.map(resource =>
        resource.id === updatedResource.id ? updatedResource : resource
      )
    })
  }

  reorderResources = (resource, e) => {
    let sortedArray = this.state.currentResources.sort((a, b) => a.ord_num < b.ord_num ? -1 : 1)
    sortedArray.splice((resource.ord_num - 1), 1)
    sortedArray.splice((e.target.value - 1), 0, resource)
    let newOrder = sortedArray.map((resource, index) => {
      return Object.assign({}, resource, { ord_num: (index + 1) })
    })
    this.setState({
      currentResources: newOrder
    })
  }

  exitDisplay = () => {
    this.setState({
      detailDisplay: false
    })
  }

  displayDetails = (selectedItem) => {
    this.setState({
      detailDisplay: true,
      detailsItem: selectedItem,
      addedItem: this.checkIfAdded(selectedItem)
    })
    console.log(this.checkIfAdded(selectedItem))
    console.log(this.state.addedItem)
  }

  checkIfAdded = (selectedItem) => {
    let matchedItem = this.state.currentResources.filter(resource => resource.url === selectedItem.links[0]["href"])
    if (matchedItem.length > 0) {
      return matchedItem[0]
    }
    else { return false }
  }

  render() {
    //We have 2 routers -- one for logged in, and one for logged out 
    // in logged out -> '/' is log in component
    // in logged in -> '/' is the home page 

    if (this.state.isLoggedIn === true) {
      return (
        <Router>
          <div>
            <Container align='center' >
              <NavBar logout={this.logout} />
            </Container>
            {/* Covers routing from logged out Router */}
            <Route path='/signup' render={routerProps => <Redirect to="/" />} />

            <Route exact path='/' render={routerProps =>
              <Home
                apodImg={this.state.apodImg}
                searchChange={this.searchChange}
                createResource={this.createResource}
                results={this.state.results}
                currentResources={this.state.currentResources}
                deleteResource={this.deleteResource}
                detailDisplay={this.state.detailDisplay}
                displayDetails={this.displayDetails}
                detailsItem={this.state.detailsItem}
                addedItem={this.state.addedItem}
                exitDisplay={this.exitDisplay}
              />} />

            <Route exact path='/project' component={() => <Project
              project={this.state.currentProject}
              resources={this.state.currentResources}
              deleteResource={this.deleteResource}
              saveResources={this.saveResources}
              editResource={this.editResource}
              reorder={this.reorderResources}
              apodImg={this.state.apodImg}
              />} />

          </div>
        </Router>
      )
    } else {
      return (
        <Router>
          <div>
            {/* Covers routing from logged in Router*/}
            <Route exact path='/login' render={routerProps => <Redirect to="/" />} />
            <Route exact path='/project' render={routerProps => <Redirect to="/" />} />

            <Route exact path='/signup' render={routerProps => <Signup
              signup={this.signup}
              projects={this.state.projects}
              apodImg={this.state.apodImg}
            />} />

            <Route exact path='/' render={routerProps => <Login
              login={this.login}
              apodImg={this.state.apodImg}
            />} />

            <Route exact path='/newproject' component={() => <NewProject
              newProject={this.newProject}
              apodImg={this.state.apodImg}
            />} />
          </div>
        </Router>
      )
    }
  }
}

