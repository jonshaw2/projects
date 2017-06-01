import {winCondition} from './CheckWinCondition';

export function aiMove(playerState,playerHand,riverHand, deck){

  let counter = [0,0]
  let simHand = []
  let aiHand = playerHand[1].map((item, i) => item)

  for (let i = 0; i<200; i++){


      let newDeck = deck.map((item, i) => item)

      let shufflingList = []
      while (newDeck.length >0){
        let chosenCard = Math.floor(Math.random()* (newDeck.length));
        let splice =(newDeck.splice(chosenCard, 1));
        shufflingList.push(splice[0]);
      }
      newDeck = shufflingList;


      let newRiverHand = riverHand.map((item, i) => item);
      simHand=[]
      while(newRiverHand.length < 5){
        let tempDeck = newDeck.splice(0,newDeck.length-1);
        let AddCard = newDeck.splice(0,1)
        newRiverHand = newRiverHand.concat(AddCard);
        newDeck = tempDeck
      }
      while(simHand.length < 2){
        let tempDeck = newDeck.splice(0,newDeck.length-1);
        let AddCard = newDeck.splice(0,1)
        simHand = simHand.concat(AddCard);
        newDeck = tempDeck
      }


      let condition= winCondition(playerState,[simHand,aiHand],newRiverHand,[])

      let maxWinner=0
      let maxOne=0
      let maxTwo=0
      let maxThree=0
      let maxFour=0
      let maxFive=0

      //check highest winning hand
      for(let i=0; i<playerState.length; i++){

        if(playerState[i] === 'in'){
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

      for(let i=0; i<playerState.length; i++){
        if(playerState[i] === 'in'){
          if(maxWinner === condition.winner[i].winning && maxOne === condition.winner[i].One && maxTwo === condition.winner[i].Two && maxThree === condition.winner[i].Three && maxFour === condition.winner[i].Four && maxFive === condition.winner[i].Five){
            winner.push(i);
          }
        }
      }


      if(winner.length > 1){
        condition.tempMessage.push('push between player 1 and 2');

      } else{
        condition.tempMessage.push('player ' + winner[0]+' wins');
        counter[winner[0]] += 1

      }

  }

return counter;


}
