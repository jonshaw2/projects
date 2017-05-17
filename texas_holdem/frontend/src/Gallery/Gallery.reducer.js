const INITIAL_STATE = {
  index: {},
  tables: {},
  category: []
}

function reducer(state = INITIAL_STATE, action){
  if (action.type === 'gallery_initiate'){
    let newCategory = []
    var categories = {}
    var index = {}


    let category = action.payload.category;

    for (let i = 0; i<category.length; i++){
      newCategory.push(category[i].category);
      categories[category[i].category]=[];
      index[category[i].category]=[0];

    }

    let table = action.payload.table;
    for (let j = 0; j<table.length; j++){
      categories[table[j].category].push(table[j])
    }


    return Object.assign({}, state, {
      index: index,
      tables: categories,
      category: newCategory

    })
  }

  return state;
}

export default reducer
