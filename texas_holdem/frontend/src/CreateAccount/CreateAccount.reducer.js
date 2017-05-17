const INITIAL_STATE = {
  username: '',
  name: '',
  password: '',
  email: ''
  // put properties you need here
};

export default function reducer(state = INITIAL_STATE, action) {
  if(action.type === 'changeUsername'){
    return Object.assign({}, state, {
      username: action.username
    })
  }
  if(action.type === 'changePassword'){
    return Object.assign({}, state, {
      password: action.password
    })
  }
  if(action.type === 'changeName'){
    return Object.assign({}, state, {
      name: action.name
    })
  }
  if(action.type === 'changeEmail'){
    return Object.assign({}, state, {
      email: action.email
    })
  }
  if(action.type === 'addAccount'){

    return Object.assign({},state,{
      username: '',
      name: '',
      password: '',
      email: ''
    })
  }
  return state;
}
