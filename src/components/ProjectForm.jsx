import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../actions/formActions";
import axios from "axios";

class ProjectForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProject: "",
      currentRole: "",
      currentUser: ""
    };
  }

  projectSplit(key) {
    return this.props.syncProjects.map(project => {
      return <option key={key}>{project.name}</option>;
    });
  }

  roleSplit(key) {
    return this.props.syncRoles.map(role => {
      return <option key={key}>{role.name}</option>;
    });
  }

  userSplit(key) {
    return this.props.syncUsers.map(user => {
      return <option key={key}>{user.name}</option>;
    });
  }

  onClick(e) {
    const { currentProject, currentRole, currentUser } = this.state;
    console.log(this.state, "<<<< ------- is state");

    for (let project = 0; project < this.props.syncCurrent.length; project++) {
      console.log(project, "<<< ----- is project");
      if (
        JSON.stringify(this.props.syncCurrent[project]) ===
        JSON.stringify({
          project: currentProject,
          role: currentRole,
          user: currentUser
        })
      ) {
        console.log("Duplication error");
        console.log(this.props);
        return true;
      }
      console.log("Success");
    }
    this.props.userAssignment({
      project: currentProject,
      role: currentRole,
      user: currentUser
    });
  }

  componentWillMount() {
    // TODO: Finish fetch request
    axios.get("http://localhost:3001/userAssignments").then(result => {
      console.log(result.data, "<<< ----- API response");
    });
  }

  render() {
    return (
      <div>
        <form className="form" action="GET">
          <h1>Assign User Projects</h1>
          <select
            id="project-nav"
            onChange={e => {
              this.setState({ currentProject: e.target.value });
            }}
          >
            <option value="">Projects</option>
            {this.projectSplit()}
          </select>
          <select
            id="user-nav"
            onChange={e => {
              this.setState({ currentUser: e.target.value });
            }}
            disabled={this.state.currentProject === ""}
          >
            <option value="">User</option>
            {this.userSplit()}
          </select>
          <select
            id="role-nav"
            onChange={e => {
              this.setState({ currentRole: e.target.value });
            }}
            disabled={this.state.currentUser === ""}
          >
            <option value="">Role</option>
            {this.roleSplit()}
          </select>
          <input
            id="save-btn"
            type="button"
            value="Save"
            onClick={e => {
              this.onClick(e);
            }}
          />
          <div id="status-btn" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state, "< ----- is state");
  return {
    syncProjects: state.forms.projects,
    syncRoles: state.forms.roles,
    syncUsers: state.forms.users,
    syncCurrent: state.forms.userAssignments
  };
};

export default connect(
  mapStateToProps,
  { userAssignment: actions.addUserAssignment }
)(ProjectForm);
