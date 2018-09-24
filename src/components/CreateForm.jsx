import React, { Component } from 'react'


class CreateForm extends Component {
  render() {
    const users = ['phillip', 'testing']
    const userSplit = users.map((user) => {
      return <option onClick={test}>{user}</option>
    })
    const test = () => {
      console.log(this.props)
      console.log('Got here!')
    }

    return (
      <div>
        <form className="form">
          <h1>Assign User Projects</h1>
          <select id="drop-nav">
            <option value="">Projects</option>
            {userSplit}
          </select><select id="drop-nav">
            <option value="">Role</option>
            {userSplit}
          </select>
          <select id="drop-nav">
            <option value="">User</option>
            {userSplit}
          </select>
          <input type="button" value="Save"></input>
        </form>
      </div>
    )
  }
}


export default CreateForm;