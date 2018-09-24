const addUserAssignment = function (payload) {

  //Return a function (dispatch) 
  // fetch or axios
  return { type: 'ADD_USER_ASSIGNMENT', payload }
}

const actions = {
  addUserAssignment
}

export default actions;