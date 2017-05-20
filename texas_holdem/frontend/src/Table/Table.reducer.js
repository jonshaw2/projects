const INITIAL_STATE = {
  currentStatus: 'Waiting',
  Seat: [false,true],
  category: [],
  deck: [],
  playerHand: [[],[]],
  playerState: ['fold','fold','fold','fold'],
  riverHand: [],
  lastRaise: [],
  combinedHand: [[],[],[],[]]
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

  if (action.type === 'Reset'){
    return Object.assign({},state,{
      currentStatus: 'Waiting',
      riverHand: [],
      playerHand: [[],[]],
      Seat: [false,true],
    })
  }


  if (action.type === 'Stand'){
    if (state.currentStatus === 'cardDealt'){
      let newDeck = state.deck.splice(0,state.deck.length-3);
      let AddCard = state.deck.splice(0,3)
      console.log(newDeck);
      let newRiver = state.riverHand.concat(AddCard);
      console.log('newDeck',newDeck);
      console.log('newRiver',newRiver);
    return Object.assign({},state,{
      deck: newDeck,
      riverHand: newRiver,
      currentStatus: 'riverOne'
    })
    } else if (state.currentStatus === 'riverOne'){
      let newDeck = state.deck.splice(0,state.deck.length-1);
      let AddCard = state.deck.splice(0,1)
      console.log(newDeck);
      let newRiver = state.riverHand.concat(AddCard);
      console.log('newDeck',newDeck);
      console.log('newRiver',newRiver);
    return Object.assign({},state,{
      deck: newDeck,
      riverHand: newRiver,
      currentStatus: 'riverTwo'
    })
    } else if (state.currentStatus === 'riverTwo'){
      let newDeck = state.deck.splice(0,state.deck.length-1);
      let AddCard = state.deck.splice(0,1)
      console.log(newDeck);
      let newRiver = state.riverHand.concat(AddCard);
      console.log('newDeck',newDeck);
      console.log('newRiver',newRiver);
      return Object.assign({},state,{
      deck: newDeck,
      riverHand: newRiver,
      currentStatus: 'riverThree'
      })
    } else if (state.currentStatus === 'riverThree'){
        //check players still 'in', then combine hand with river
        var combineHand = [[],[],[],[]]
        for (let i=0; i<state.playerState.length; i++){
          console.log('in a for loop');
          if (state.playerState[i]==='in'){
            console.log('in the in state')
            combineHand[i] = state.riverHand.concat(state.playerHand[i])
          }
        }
        console.log('combineHand',combineHand);
        //sort the hands
        for(let i=0; i<combineHand.length;i++){
          if(state.playerState[i] === 'in'){
            let tempArray = [];
            let temp;
            let minIdx;
            for(let j=0; j<7;j++){
              let min = 13;
              for(let k=0; k<combineHand[i].length;k++){
                if(combineHand[i][k].point<min){
                  console.log('combine hand',combineHand[i][k].point)
                  console.log('min',min);
                  min=combineHand[i][k].point;
                  minIdx=k;
                }
              }
              temp = combineHand[i].splice(minIdx,1);
              tempArray.push(temp[0]);
              console.log(temp[0].point)
            }
            combineHand[i]=tempArray;
          }

        }
        console.log(combineHand);
    }
  }


  if (action.type === 'Deal'){
    console.log('dealing')
    let newArray= new Array(4);
    for (let i = 0; i<state.Seat.length;i++){
      if (state.Seat[i] === true){
        newArray[i] = 'in'
      } else{
        newArray[i] = 'fold'
      }
    }
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
    return Object.assign({},state,{
      playerHand: newPlayerHand,
      deck: deck,
      currentStatus: 'cardDealt',
      playerState: newArray
    })
  }

  return state;
}

export default reducer
