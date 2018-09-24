import React, { Component } from "react";
import { connect } from "react-redux";
import formActions from "../actions/formActions";
import axios from "axios";

class ProjectForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProject: "",
      currentRole: "",
      currentUser: "",
      serverStatus: 0,
      serverMsg: "Server Waiting for input..."
    };
  }

  // Split functions populate menus

  projectSplit(key) {
    return this.props.allProjects.map(project => {
      return <option key={key}>{project.name}</option>;
    });
  }

  roleSplit(key) {
    return this.props.allRoles.map(role => {
      return <option key={key}>{role.name}</option>;
    });
  }

  userSplit(key) {
    return this.props.allUsers.map(user => {
      return <option key={key}>{user.name}</option>;
    });
  }

  onClick(e) {
    const { currentProject, currentRole, currentUser } = this.state;

    //Checking current selection against Redux state for Duplication Issues
    for (
      let project = 0;
      project < this.props.allUserAssignments.length;
      project++
    ) {
      if (
        JSON.stringify(this.props.allUserAssignments[project]) ===
        JSON.stringify({
          project: currentProject,
          role: currentRole,
          user: currentUser
        })
      ) {
        this.setState({
          serverStatus: 404,
          serverMsg: "User/Role Already Assigned"
        });
        return true;
      }
    }
    this.props.addUserAssignment({
      project: currentProject,
      role: currentRole,
      user: currentUser
    });
    this.setState({
      serverStatus: this.requestServerStatus(this.state.serverMsg),
      serverMsg: "Success!"
    });
  }

  requestServerStatus(serverMsg) {
    axios({
      method: "post",
      url: "http://localhost:3001/userAssignments",
      data: {
        state: this.state
      }
    });
  }

  render() {
    return (
      <div>
        <form className="form" action="GET">
          <h1>Assign User Projects</h1>
          <select
            id="project-nav"
            onChange={e => this.setState({ currentProject: e.target.value })}
          >
            <option value="">Projects</option>
            {this.projectSplit()}
          </select>
          <select
            id="user-nav"
            onChange={e => this.setState({ currentUser: e.target.value })}
            disabled={this.state.currentProject === ""}
          >
            <option value="">User</option>
            {this.userSplit()}
          </select>
          <select
            id="role-nav"
            onChange={e => this.setState({ currentRole: e.target.value })}
            disabled={this.state.currentUser === ""}
          >
            <option value="">Role</option>
            {this.roleSplit()}
          </select>
          <input
            id="save-btn"
            type="button"
            value="Save"
            onClick={e => this.onClick(e)}
          />
          <p>{this.state.serverMsg}</p>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allProjects: state.forms.projects,
    allRoles: state.forms.roles,
    allUsers: state.forms.users,
    allUserAssignments: state.forms.userAssignments
  };
};

export default connect(
  mapStateToProps,
  { addUserAssignment: formActions.addUserAssignment }
)(ProjectForm);
