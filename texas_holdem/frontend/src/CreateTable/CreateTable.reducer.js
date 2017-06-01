const INITIAL_STATE = {
  tablename : '',
  probabilityassist : 'false',
  aichips : 0
};

export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === 'changeTableName'){
    return Object.assign({}, state, {
      tablename: action.tablename
    })
  }

  if (action.type === 'changeAiChips'){
    return Object.assign({}, state, {
      aichips: action.aichips
    })
  }

  if (action.type === 'changeProbabilityAssist'){
    return Object.assign({}, state, {
      probabilityassist: action.probabilityassist
    })
  }

  if (action.type === 'addTable'){
    return state
  }

  return state;
}
