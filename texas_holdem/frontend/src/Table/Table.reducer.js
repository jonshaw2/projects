import {winCondition} from './CheckWinCondition';
import {aiMove} from './aiMove'

const INITIAL_STATE = {
  currentStatus: 'Waiting',
  Seat: [true,true],
  category: [],
  deck: [],
  playerHand: [[],[]],
  playerState: ['fold','fold','fold','fold'],
  riverHand: [],
  lastRaise: -1,
  combinedHand: [[],[],[],[]],
  message: [],
  raise:[0,0,0,0],
  chips:[1000,1000000000,0,0],
  pot: 0,
  raiseButton: false,
  aiBetWeight: 0,
  aiRaise: false,

}

function reducer(state = INITIAL_STATE, action){
  if (action.type === 'table_initiate'){
    let newChips = state.chips.map((item, j)=> j === 1? action.payload.aichips : action.userchips)
    return Object.assign({}, state, {
      tableInfo: action.payload,
      chips: newChips

    })
  }

  if (action.type === 'Raise'){

    if (state.lastRaise === 1){
      let newRaise = state.raise.map((item, i)=> item)
      let newChips = state.chips.map((item, j)=> j === 0? item-newRaise[1] : item)
      let newPot = state.pot + newRaise[1]
      state = Object.assign({}, state, {
        chips: newChips,
        pot: newPot
      })
    }


    let aiWinRate = aiMove(state.playerState,state.playerHand,state.riverHand,state.deck)

    if (aiWinRate[1]/(aiWinRate[0]+aiWinRate[1]) + state.aiBetWeight > .40){
      let newRaise = state.raise.map((item, i)=> i === 1? state.raise[0] : item)
      let newChips = state.chips.map((item, j)=> item-newRaise[j])
      let newPot = state.pot
      for(let i=0; i<newRaise.length; i++){
        newPot += newRaise[i]
      }

      return Object.assign({}, state, {
        raise: newRaise,
        chips: newChips,
        pot: newPot,
        lastRaise: 0,
        raiseButton: true,
        aiBetWeight: state.aiBetWeight + .1
      })
    } else{
      let tempMessage = state.message.map((item, i)=> item)
      tempMessage.push('AI folded')
      return Object.assign({}, state, {
        playerState: ['in','fold','fold','fold'],
        currentStatus: 'aiFold',
        raiseButton: true,
        lastRaise: 0,
        message: tempMessage,
        chips: state.chips,
        pot: state.pot
      })
    }



  }

  if (action.type === 'fold'){
    let tempMessage = state.message.map((item, i)=> item)
    tempMessage.push('Player folded')

    let newChips = state.chips.map((item, i)=> i === 1 ? item+state.pot : item)
    console.log('in player fold');


    return Object.assign({}, state, {
      playerState: ['fold','in','fold','fold'],
      currentStatus: 'end',
      raiseButton: false,
      chips: newChips,
      lastRaise: -1,
      message: tempMessage
    })
  }


  if (action.type === 'ChangeBet'){
    if(state.raise[action.index] + action.change >=0 && state.raise[action.index] + action.change <= state.chips[action.index]){
      let tempArray = state.raise.map((item, i)=> i === action.index ? item + action.change : item)
      return Object.assign({}, state, {
        raise: tempArray
      })
    } else{
      return state;
    }
  }


  if (action.type === 'sitDown'){
    let newArray = state.Seat.map((item, i) => i === action.seat ? true: item);

    let newChips = state.chips.map((item, j)=> j === action.seat ? action.payload.chips : action.payload.aichip);
    return Object.assign({}, state, {
      Seat: newArray,
      chips: newChips

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
      message: [],
      playerState: ["fold","fold","fold","fold"],
      combineHand: [[],[],[],[]],
      pot: 0,
      raiseButton: false,
      lastRaise: -1,
      aiBetWeight: 0,
      aiRaise: false,
    })
  }


  if (action.type === 'Stand'){
    if(state.lastRaise === 1){
      let newRaise = state.raise.map((item, i)=> item)
      let newChips = state.chips.map((item, j)=> j === 0? item-newRaise[1] : item)
      let newPot = state.pot + newRaise[1]
      state = Object.assign({}, state, {
        chips: newChips,
        pot: newPot
      })
    }



    if(state.lastRaise !== 1){
      let aiWinRate = aiMove(state.playerState,state.playerHand,state.riverHand,state.deck)

      if (aiWinRate[1]/(aiWinRate[0]+aiWinRate[1]) > .50){
        let newRaise = state.raise.map((item, i)=> i === 1? 500 : item)
        let newChips = state.chips.map((item, j)=> j === 1? item-500 : item)
        let tempMessage = state.message.map((item, k)=> item)
        let newPot = state.pot
        newPot += newRaise[1]
        tempMessage.push('AI raised 500')
        return Object.assign({},state,{
          pot: newPot,
          raise: newRaise,
          chips: newChips,
          lastRaise: 1,
          aitBetWeight: state.aiBetWeight + .1,
          message: tempMessage,
          raiseButton: false

        })
      }
    }

    if (state.currentStatus === 'cardDealt'){
      let newDeck = state.deck.splice(0,state.deck.length-3);
      let AddCard = state.deck.splice(0,3)

      let newRiver = state.riverHand.concat(AddCard);

    return Object.assign({},state,{
      deck: newDeck,
      riverHand: newRiver,
      currentStatus: 'riverOne',
      raiseButton: false,
      lastRaise: -1
    })
    } else if (state.currentStatus === 'riverOne'){
      let newDeck = state.deck.splice(0,state.deck.length-1);
      let AddCard = state.deck.splice(0,1)

      let newRiver = state.riverHand.concat(AddCard);

    return Object.assign({},state,{
      deck: newDeck,
      riverHand: newRiver,
      currentStatus: 'riverTwo',
      raiseButton: false,
      lastRaise: -1
    })
    } else if (state.currentStatus === 'riverTwo'){
      let newDeck = state.deck.splice(0,state.deck.length-1);
      let AddCard = state.deck.splice(0,1)

      let newRiver = state.riverHand.concat(AddCard);




      return Object.assign({},state,{
      deck: newDeck,
      riverHand: newRiver,
      currentStatus: 'riverThree',
      raiseButton: false,
      lastRaise: -1
      })
    } else if (state.currentStatus === 'riverThree'){
      let condition= winCondition(state.playerState,state.playerHand,state.riverHand,state.message)

      let maxWinner=0
      let maxOne=0
      let maxTwo=0
      let maxThree=0
      let maxFour=0
      let maxFive=0

      //check highest winning hand
      for(let i=0; i<state.playerState.length; i++){

        if(state.playerState[i] === 'in'){
          if(condition.winner[i].winning > maxWinner){
            maxOne=0
            maxTwo=0
            maxThree=0
            maxFour=0
            maxFive=0
          }

          if(condition.winner[i].winning >= maxWinner){
            maxWinner = condition.winner[i].winning

            if(condition.winner[i].One >= maxOne){
              maxOne = condition.winner[i].One

              if(condition.winner[i].Two >= maxTwo){
                maxTwo = condition.winner[i].Two

                if(condition.winner[i].Three >= maxThree){
                  maxThree = condition.winner[i].Three

                  if(condition.winner[i].Four >= maxFour){
                    maxFour = condition.winner[i].Four

                    if(condition.winner[i].Five >= maxFive){
                      maxFive = condition.winner[i].Five
                    }
                  }
                }

              }
            }

          }
        }
      }

      let winner=[]
      //check for player with winning hand

      for(let i=0; i<state.playerState.length; i++){
        if(state.playerState[i] === 'in'){
          if(maxWinner === condition.winner[i].winning && maxOne === condition.winner[i].One && maxTwo === condition.winner[i].Two && maxThree === condition.winner[i].Three && maxFour === condition.winner[i].Four && maxFive === condition.winner[i].Five){
            winner.push(i);
          }
        }
      }
      let newChips

      if(winner.length > 1){
        condition.tempMessage.push('push between player 1 and 2');
        newChips = state.chips
      } else{
        condition.tempMessage.push('player ' + winner[0]+' wins');
        newChips = state.chips.map((item, i)=> i === winner[0]? item+state.pot : item)

      }

      return Object.assign({},state,{
        message: condition.tempMessage,
        currentStatus: 'end',
        raiseButton: false,
        chips: newChips,
        lastRaise: -1
      })
    } else if (state.crrentStatus === 'aiFold'){
        let newChips = state.chips.map((item, i)=> i === 0 ? item+state.pot : item)
        return Object.assign({}, state, {
          currentStatus: 'end',
          raiseButton: false,
          chips: newChips,
          lastRaise: -1
        })
    } else if (state.currentStatus === 'playerFold'){
      let newChips = state.chips.map((item, i)=> i === 1 ? item+state.pot : item)
      console.log('in player fold');


      return Object.assign({}, state, {
        currentStatus: 'end',
        raiseButton: false,
        chips: newChips,
        lastRaise: -1

      })
    }
  }


  if (action.type === 'Deal'){
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
      let chosenCard = Math.floor(Math.random()* (deck.length));
      let splice =(deck.splice(chosenCard, 1));
      shufflingList.push(splice[0]);
    }
    deck = shufflingList;

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
      playerState: newArray,
      lastRaise: -1
    })
  }

  return state;
}

export default reducer
