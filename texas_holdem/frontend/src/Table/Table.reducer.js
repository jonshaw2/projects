const INITIAL_STATE = {
  currentStatus: 'Waiting',
  Seat: [false,false],
  category: [],
  deck: [],
  playerHand: [[],[],[],[]]
}

function reducer(state = INITIAL_STATE, action){
  if (action.type === 'table_initiate'){
    return Object.assign({}, state, {

      tableInfo: action.payload
    })
  }

  if (action.type === 'sitDown'){
    let newArray = state.Seat.map((item, i) => i === action.seat ? true: item);
    console.log('sit down',action.seat);
    return Object.assign({}, state, {
      Seat: newArray
    })
  }

  if (action.type === 'standUp'){
    let newArray= state.Seat.map((item, i) => i === action.seat ? false: item);
    return Object.assign({}, state, {
      Seat: newArray
    })
  }

  if (action.type === 'Deal'){
    console.log('dealing')

    // create new deck
    let deck = []
    let points = [1,2,3,4,5,6,7,8,9,10,11,12,13];
    let suits = ['spades','hearts','clubs','diamonds'];
    for (let i=0; i<points.length; i++){
      for (let j=0; j<suits.length; j++){
          deck.push({point: points[i], suit: suits[j]});
      }
    }

    //shuffle deck
    let shufflingList = []
    while (deck.length >0){
      let chosenCard = Math.floor(Math.random()* (deck.length - 1));
      let splice =(deck.splice(chosenCard, 1));
      shufflingList.push(splice[0]);
    }
    deck = shufflingList;
    console.log(deck);
    let newPlayerHand = [[],[],[],[]];
    let dealtCard;
    for (let i=0;i<state.Seat.length;i++){
      if(state.Seat[i]===true){
        dealtCard = (deck.splice(0,2));
        newPlayerHand[i].push(dealtCard[0]);
        newPlayerHand[i].push(dealtCard[1]);
      }
    }
    console.log(newPlayerHand);
    return Object.assign({},state,{
      playerHand: newPlayerHand,
      deck: deck,
      currentStatus: 'CardDealt'
    })
  }

  return state;
}

export default reducer
