import React, { Component } from 'react'
import { connect } from 'react-redux';
import actions from '../actions/formActions'
import axios from 'axios';


class ProjectForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentProject: '',
      currentRole: '',
      currentUser: '',
      apiStatus: 0 // For Notification button
    }

  }

  projectSplit(key) {
    return this.props.syncProjects.map((project) => {
      return <option key={key}>{project.name}</option>
    })
  }

  roleSplit(key) {
    return this.props.syncRoles.map((role) => {
      return <option key={key}>{role.name}</option>
    })
  }

  userSplit(key) {
    return this.props.syncUsers.map((user) => {
      return <option key={key}>{user.name}</option>
    })
  }

  test(currentSelection) {
    this.props.syncCurrent.forEach((project) => {

    })
  }

  onClick(e) {
    const { currentProject, currentRole, currentUser } = this.state;
    console.log(this.state)
    this.props.syncCurrent.map((project) => {
      if (JSON.stringify(project) === JSON.stringify()) {
        console.log('Match found! Cannot add!')
        return
      }
    })

    this.props.userAssignment({
      project: currentProject,
      role: currentRole,
      user: currentUser
    })

    this.test(e)
  }

  componentWillMount() {
    // TODO: Finish fetch request 
    axios.get('http://localhost:3001/userAssignments')
      .then((result) => {
        console.log(result.data, "<<< ----- API response")
      })

  }

  render() {
    return (
      <div>
        <form className="form" action="GET" >
          <h1>Assign User Projects</h1>
          <select id="project-nav" onChange={(e) => { this.setState({ currentProject: e.target.value }) }}>
            <option value="">Projects</option>
            {this.projectSplit()}
          </select>
          <select id="user-nav"
            onChange={(e) => { this.setState({ currentUser: e.target.value }) }}
            disabled={this.state.currentProject === ""}
          >
            <option value="">User</option>
            {this.userSplit()}
          </select>
          <select id="role-nav"
            onChange={(e) => { this.setState({ currentRole: e.target.value }) }}
            disabled={this.state.currentUser === ""}
          >
            <option value="">Role</option>
            {this.roleSplit()}
          </select >
          <input id="save-btn" type="button" value="Save" onClick={(e) => { this.onClick(e) }}></input>
          <div id="status-btn" onClick={(e) => { this.onClick(e) }}></div>
        </form >
      </div >
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state, '< ----- is state')
  return {
    'syncProjects': state.forms.projects,
    'syncRoles': state.forms.roles,
    'syncUsers': state.forms.users,
    'syncCurrent': state.forms.userAssignments
  }
}


export default connect(mapStateToProps, { userAssignment: actions.addUserAssignment })(ProjectForm);