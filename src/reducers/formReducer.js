const initialState = {
  users: [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Alice' }, { id: 3, name: 'Bob' }],
  roles: [{ id: 1, name: 'Admin' }, { id: 2, name: 'Editor' }, { id: 3, name: 'Viewer' }],
  projects: [{ id: 1, name: 'Trip to space' }, { id: 2, name: 'Assembly Ikea furniture' }, { id: 3, name: 'Datumize Zentral' }],
  userAssignments: []
};

export default function (state = initialState, action) {

  switch (action.type) {
    case "ADD_USER_ASSIGNMENT":
      state.userAssignments = [...state.userAssignments, action.payload]
      return {...state}

    default:
      return state
  }
}