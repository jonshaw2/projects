const INITIAL_STATE ={
  test: 'test'
};

function reducer(state=INITIAL_STATE, action){
  if(action.type==='test'){
    return state;
  }

  return state;
}

export default reducer;
