export function winCondition(playerState,playerHand,riverHand,message){
  //check players still 'in', then combine hand with river
  var winner =[{winning:0,
                One:0,
                Two:0,
                Three:0,
                Four:0,
                Five:0},
              {winning:0,
                One:0,
                Two:0,
                Three:0,
                Four:0,
                Five:0}]

  var combineHand = [[],[],[],[]]
  for (let i=0; i<playerState.length; i++){

    if (playerState[i]==='in'){

      combineHand[i] = riverHand.concat(playerHand[i])
    }
  }

  //sort the hands least to greatest
  for(let i=0; i<combineHand.length;i++){
    if(playerState[i] === 'in'){
      let tempArray = [];
      let temp;
      let minIdx;
      for(let j=0; j<7;j++){
        let min = 14;
        for(let k=0; k<combineHand[i].length;k++){
          if(combineHand[i][k].point<min){

            min=combineHand[i][k].point;
            minIdx=k;
          }
        }
        temp = combineHand[i].splice(minIdx,1);
        tempArray.push(temp[0]);

      }
      combineHand[i]=tempArray;
    }

  }

  //sort hand by suits
  var combineHandSortBySuit=[{spades:[],hearts:[],clubs:[],diamonds:[]},
                       {spades:[],hearts:[],clubs:[],diamonds:[]},
                       {spades:[],hearts:[],clubs:[],diamonds:[]},
                       {spades:[],hearts:[],clubs:[],diamonds:[]}]

  for(let i=0;i<combineHand.length;i++){

    if(playerState[i] === 'in'){
      for(let j=0; j<combineHand[i].length;j++){
        if (combineHand[i][j].suit === 'spades'){
          combineHandSortBySuit[i].spades = combineHandSortBySuit[i].spades.concat([combineHand[i][j].point]);
        } else if(combineHand[i][j].suit === 'hearts'){
          combineHandSortBySuit[i].hearts = combineHandSortBySuit[i].hearts.concat([combineHand[i][j].point]);
        } else if(combineHand[i][j].suit === 'clubs'){
          combineHandSortBySuit[i].clubs = combineHandSortBySuit[i].clubs.concat([combineHand[i][j].point]);
        } else{
          combineHandSortBySuit[i].diamonds = combineHandSortBySuit[i].diamonds.concat([combineHand[i][j].point]);
        }

      }
    }

  }


  //sort hand for straight flush checks
  // var combineHandSortBySuitWithAceInEnd = combineHandSortBySuit
  var combineHandSortBySuitWithAceInEnd = combineHandSortBySuit.map((item, i) => Object.assign({}, item, {
    spades: item.spades,
    hearts: item.hearts,
    clubs: item.clubs,
    diamonds: item.diamonds
  }));

  for(let i=0;i<combineHand.length;i++){
    if(playerState[i] === 'in'){
      for(let j=0; j<combineHandSortBySuitWithAceInEnd[i].spades.length;j++){
        if(combineHandSortBySuitWithAceInEnd[i].spades[j]===1){
          combineHandSortBySuitWithAceInEnd[i].spades = combineHandSortBySuitWithAceInEnd[i].spades.concat([14]);
        }
      }
      for(let j=0; j<combineHandSortBySuitWithAceInEnd[i].hearts.length;j++){
        if(combineHandSortBySuitWithAceInEnd[i].hearts[j]===1){
          combineHandSortBySuitWithAceInEnd[i].hearts = combineHandSortBySuitWithAceInEnd[i].hearts.concat([14]);
        }
      }
      for(let j=0; j<combineHandSortBySuitWithAceInEnd[i].clubs.length;j++){
        if(combineHandSortBySuitWithAceInEnd[i].clubs[j]===1){
          combineHandSortBySuitWithAceInEnd[i].clubs = combineHandSortBySuitWithAceInEnd[i].clubs.concat([14]);
        }
      }
      for(let j=0; j<combineHandSortBySuitWithAceInEnd[i].diamonds.length;j++){
        if(combineHandSortBySuitWithAceInEnd[i].diamonds[j]===1){
          combineHandSortBySuitWithAceInEnd[i].diamonds = combineHandSortBySuitWithAceInEnd[i].diamonds.concat([14]);
        }
      }

    }
  }

  //sort hand for straight checks

  var combineHandWithAceInEndNoRepeat = combineHand.map((item, i) =>
    item.map((item2, j) =>
      item2.point
  ));

  for(let i=0; i<combineHandWithAceInEndNoRepeat.length; i++){
    if(playerState[i] === 'in'){
      let newArray = []
      newArray[0]=(combineHandWithAceInEndNoRepeat[i][0]);
      for(let j=1; j<combineHandWithAceInEndNoRepeat[i].length; j++){
        if(combineHandWithAceInEndNoRepeat[i][j] !== combineHandWithAceInEndNoRepeat[i][j-1]){
          newArray.push(combineHandWithAceInEndNoRepeat[i][j]);
        }
      }
      if(newArray[0]===1){
        newArray.push(14);
      }
      combineHandWithAceInEndNoRepeat[i]=newArray

    }
  }



//sort hand for high check with repeats

var combineHandWithAceInEnd = combineHand.map((item, i) =>
  item.map((item2, j) =>
    item2.point
));

for(let i=0; i<combineHandWithAceInEnd.length; i++){
  if(playerState[i] === 'in'){
    let arrayLength = combineHandWithAceInEnd[i].length
    for(let j=0; j<arrayLength; j++){

      if(combineHandWithAceInEnd[i][j] === 1){
        combineHandWithAceInEnd[i] = combineHandWithAceInEnd[i].concat([14])
      }

    }
  }
}


//sort hand by points

  var combineHandSortByPoint=[{one:[],two:[],three:[],four:[],five:[],six:[],seven:[],eight:[],nine:[],ten:[],eleven:[],twelve:[],thirteen:[]},
                              {one:[],two:[],three:[],four:[],five:[],six:[],seven:[],eight:[],nine:[],ten:[],eleven:[],twelve:[],thirteen:[]},
                              {one:[],two:[],three:[],four:[],five:[],six:[],seven:[],eight:[],nine:[],ten:[],eleven:[],twelve:[],thirteen:[]},
                              {one:[],two:[],three:[],four:[],five:[],six:[],seven:[],eight:[],nine:[],ten:[],eleven:[],twelve:[],thirteen:[]}]

  for(let i=0; i<combineHand.length; i++){
    if(playerState[i]==='in'){
      for(let j=0; j<combineHand[i].length;j++){
        if(combineHand[i][j].point === 1){
          combineHandSortByPoint[i].one = combineHandSortByPoint[i].one.concat([combineHand[i][j].point]);
        } else if(combineHand[i][j].point === 2){
          combineHandSortByPoint[i].two = combineHandSortByPoint[i].two.concat([combineHand[i][j].point]);
        } else if(combineHand[i][j].point === 3){
          combineHandSortByPoint[i].three = combineHandSortByPoint[i].three.concat([combineHand[i][j].point]);
        } else if(combineHand[i][j].point === 4){
          combineHandSortByPoint[i].four = combineHandSortByPoint[i].four.concat([combineHand[i][j].point]);
        } else if(combineHand[i][j].point === 5){
          combineHandSortByPoint[i].five = combineHandSortByPoint[i].five.concat([combineHand[i][j].point]);
        } else if(combineHand[i][j].point === 6){
          combineHandSortByPoint[i].six = combineHandSortByPoint[i].six.concat([combineHand[i][j].point]);
        } else if(combineHand[i][j].point === 7){
          combineHandSortByPoint[i].seven = combineHandSortByPoint[i].seven.concat([combineHand[i][j].point]);
        } else if(combineHand[i][j].point === 8){
          combineHandSortByPoint[i].eight = combineHandSortByPoint[i].eight.concat([combineHand[i][j].point]);
        } else if(combineHand[i][j].point === 9){
          combineHandSortByPoint[i].nine = combineHandSortByPoint[i].nine.concat([combineHand[i][j].point]);
        } else if(combineHand[i][j].point === 10){
          combineHandSortByPoint[i].ten = combineHandSortByPoint[i].ten.concat([combineHand[i][j].point]);
        } else if(combineHand[i][j].point === 11){
          combineHandSortByPoint[i].eleven = combineHandSortByPoint[i].eleven.concat([combineHand[i][j].point]);
        } else if(combineHand[i][j].point === 12){
          combineHandSortByPoint[i].twelve = combineHandSortByPoint[i].twelve.concat([combineHand[i][j].point]);
        } else if(combineHand[i][j].point === 13){
          combineHandSortByPoint[i].thirteen = combineHandSortByPoint[i].thirteen.concat([combineHand[i][j].point]);
        }
      }
    }
  }

  //start check win condition

  let tempMessage = message

  //check for royal straight flush
  for(let i=0; i<combineHand.length; i++){
    if(playerState[i]==='in'){
      if(combineHandSortBySuitWithAceInEnd[i].clubs.length >=5){
        for(let j=0; j<combineHandSortBySuitWithAceInEnd[i].clubs.length-4; j++){
          if(combineHandSortBySuitWithAceInEnd[i].clubs[j+1] === combineHandSortBySuitWithAceInEnd[i].clubs[j]+1 &&
            combineHandSortBySuitWithAceInEnd[i].clubs[j+2] === combineHandSortBySuitWithAceInEnd[i].clubs[j]+2 &&
            combineHandSortBySuitWithAceInEnd[i].clubs[j+3] === combineHandSortBySuitWithAceInEnd[i].clubs[j]+3 &&
            combineHandSortBySuitWithAceInEnd[i].clubs[j+4] === combineHandSortBySuitWithAceInEnd[i].clubs[j]+4){

            let high = combineHandSortBySuitWithAceInEnd[i].clubs[j+4]


            if(winner[i].winning<10){
              tempMessage = tempMessage.concat(['player'+i+' has a '+high+' high straight flush'])
              winner[i].winning=10
              winner[i].One=high
            }

          }
        }
      }

      if(combineHandSortBySuitWithAceInEnd[i].spades.length >=5){
        for(let j=0; j<combineHandSortBySuitWithAceInEnd[i].spades.length-4; j++){
          if(combineHandSortBySuitWithAceInEnd[i].spades[j+1] === combineHandSortBySuitWithAceInEnd[i].spades[j]+1 &&
            combineHandSortBySuitWithAceInEnd[i].spades[j+2] === combineHandSortBySuitWithAceInEnd[i].spades[j]+2 &&
            combineHandSortBySuitWithAceInEnd[i].spades[j+3] === combineHandSortBySuitWithAceInEnd[i].spades[j]+3 &&
            combineHandSortBySuitWithAceInEnd[i].spades[j+4] === combineHandSortBySuitWithAceInEnd[i].spades[j]+4){

            let high = combineHandSortBySuitWithAceInEnd[i].clubs[j+4]


            if(winner[i].winning<10){
              tempMessage = tempMessage.concat(['player'+i+' has a '+high+' high straight flush'])
              winner[i].winning=10
              winner[i].One=high
            }
          }
        }
      }

      if(combineHandSortBySuitWithAceInEnd[i].hearts.length >=5){
        for(let j=0; j<combineHandSortBySuitWithAceInEnd[i].hearts.length-4; j++){
          if(combineHandSortBySuitWithAceInEnd[i].hearts[j+1] === combineHandSortBySuitWithAceInEnd[i].hearts[j]+1 &&
            combineHandSortBySuitWithAceInEnd[i].hearts[j+2] === combineHandSortBySuitWithAceInEnd[i].hearts[j]+2 &&
            combineHandSortBySuitWithAceInEnd[i].hearts[j+3] === combineHandSortBySuitWithAceInEnd[i].hearts[j]+3 &&
            combineHandSortBySuitWithAceInEnd[i].hearts[j+4] === combineHandSortBySuitWithAceInEnd[i].hearts[j]+4){

            let high = combineHandSortBySuitWithAceInEnd[i].hearts[j+4]


            if(winner[i].winning<10){
              tempMessage = tempMessage.concat(['player'+i+' has a '+high+' high straight flush'])
              winner[i].winning=10
              winner[i].One=high
            }
          }
        }
      }

      if(combineHandSortBySuitWithAceInEnd[i].diamonds.length >=5){
        for(let j=0; j<combineHandSortBySuitWithAceInEnd[i].diamonds.length-4; j++){
          if(combineHandSortBySuitWithAceInEnd[i].diamonds[j+1] === combineHandSortBySuitWithAceInEnd[i].diamonds[j]+1 &&
            combineHandSortBySuitWithAceInEnd[i].diamonds[j+2] === combineHandSortBySuitWithAceInEnd[i].diamonds[j]+2 &&
            combineHandSortBySuitWithAceInEnd[i].diamonds[j+3] === combineHandSortBySuitWithAceInEnd[i].diamonds[j]+3 &&
            combineHandSortBySuitWithAceInEnd[i].diamonds[j+4] === combineHandSortBySuitWithAceInEnd[i].diamonds[j]+4){

            let high = combineHandSortBySuitWithAceInEnd[i].diamonds[j+4]


            if(winner[i].winning<10){
              tempMessage = tempMessage.concat(['player'+i+' has a '+high+' high straight flush'])
              winner[i].winning=10
              winner[i].One=high
            }

          }
        }
      }
    }
  }

  // check for four of a kind
  for(let i=0; i<combineHand.length; i++){
    if(playerState[i]==='in'){
      let high = 0
      if(combineHandSortByPoint[i].one.length >= 4){
        if (high<14){
          high = 14


          if(winner[i].winning<9){
            tempMessage = tempMessage.concat(['player'+i+' has a '+high+' high four of a kind'])
            winner[i].winning=9
            winner[i].One=high
          }
        }
      }
      if(combineHandSortByPoint[i].two.length >= 4){
        if (high<2){
          high = 2


          if(winner[i].winning<9){
            tempMessage = tempMessage.concat(['player'+i+' has a '+high+' high four of a kind'])
            winner[i].winning=9
            winner[i].One=high
          }
        }
      }
      if(combineHandSortByPoint[i].three.length >= 4){
        if (high<3){
          high = 3


          if(winner[i].winning<9){
            tempMessage = tempMessage.concat(['player'+i+' has a '+high+' high four of a kind'])
            winner[i].winning=9
            winner[i].One=high
          }
        }
      }
      if(combineHandSortByPoint[i].four.length >= 4){
        if (high<4){
          high = 4


          if(winner[i].winning<9){
            tempMessage = tempMessage.concat(['player'+i+' has a '+high+' high four of a kind'])
            winner[i].winning=9
            winner[i].One=high
          }
        }
      }
      if(combineHandSortByPoint[i].five.length >= 4){
        if (high<5){
          high = 5


          if(winner[i].winning<9){
            tempMessage = tempMessage.concat(['player'+i+' has a '+high+' high four of a kind'])
            winner[i].winning=9
            winner[i].One=high
          }
        }
      }
      if(combineHandSortByPoint[i].six.length >= 4){
        if (high<6){
          high = 6


          if(winner[i].winning<9){
            tempMessage = tempMessage.concat(['player'+i+' has a '+high+' high four of a kind'])
            winner[i].winning=9
            winner[i].One=high
          }
        }
      }
      if(combineHandSortByPoint[i].seven.length >= 4){
        if (high<7){
          high = 7


          if(winner[i].winning<9){
            tempMessage = tempMessage.concat(['player'+i+' has a '+high+' high four of a kind'])
            winner[i].winning=9
            winner[i].One=high
          }
        }
      }
      if(combineHandSortByPoint[i].eight.length >= 4){
        if (high<8){
          high = 8


          if(winner[i].winning<9){
            tempMessage = tempMessage.concat(['player'+i+' has a '+high+' high four of a kind'])
            winner[i].winning=9
            winner[i].One=high
          }
        }
      }
      if(combineHandSortByPoint[i].nine.length >= 4){
        if (high<9){
          high = 9


          if(winner[i].winning<9){
            tempMessage = tempMessage.concat(['player'+i+' has a '+high+' high four of a kind'])
            winner[i].winning=9
            winner[i].One=high
          }
        }
      }
      if(combineHandSortByPoint[i].ten.length >= 4){
        if (high<10){
          high = 10


          if(winner[i].winning<9){
            tempMessage = tempMessage.concat(['player'+i+' has a '+high+' high four of a kind'])
            winner[i].winning=9
            winner[i].One=high
          }
        }
      }
      if(combineHandSortByPoint[i].eleven.length >= 4){
        if (high<11){
          high = 11


          if(winner[i].winning<9){
            tempMessage = tempMessage.concat(['player'+i+' has a '+high+' high four of a kind'])
            winner[i].winning=9
            winner[i].One=high
          }
        }
      }
      if(combineHandSortByPoint[i].twelve.length >= 4){
        if (high<12){
          high = 12

          if(winner[i].winning<9){
            tempMessage = tempMessage.concat(['player'+i+' has a '+high+' high four of a kind'])
            winner[i].winning=9
            winner[i].One=high
          }
        }
      }
      if(combineHandSortByPoint[i].thirteen.length >= 4){
        if (high<13){
          high = 13


          if(winner[i].winning<9){
            tempMessage = tempMessage.concat(['player'+i+' has a '+high+' high four of a kind'])
            winner[i].winning=9
            winner[i].One=high
          }
        }
      }
      let min = 0;
      if(winner[i].winner === 9){
        for(let j=0;j<combineHandWithAceInEnd[i].length;j++){
          if(combineHandWithAceInEnd[i][j] !== high && combineHandWithAceInEnd[i][j] > min){
            min=combineHandWithAceInEnd[i][j]
          }
        }
        winner[i].Two=min
      }
    }
  }



  //check for full house
  for(let i=0; i<combineHand.length; i++){
    if(playerState[i]==='in'){
      let highThree = 0
      let highTwo = 0
      //check for three of a kind
      if(combineHandSortByPoint[i].one.length >=3){
        if(highThree<14){
          highThree = 14
        }
      }
      if(combineHandSortByPoint[i].two.length >=3){
        if(highThree<14){
          highThree = 2
        }
      }
      if(combineHandSortByPoint[i].three.length >=3){
        if(highThree<14){
          highThree = 3
        }
      }
      if(combineHandSortByPoint[i].four.length >=3){
        if(highThree<14){
          highThree = 4
        }
      }
      if(combineHandSortByPoint[i].five.length >=3){
        if(highThree<14){
          highThree = 5
        }
      }
      if(combineHandSortByPoint[i].six.length >=3){
        if(highThree<14){
          highThree = 6
        }
      }
      if(combineHandSortByPoint[i].seven.length >=3){
        if(highThree<14){
          highThree = 7
        }
      }
      if(combineHandSortByPoint[i].eight.length >=3){
        if(highThree<14){
          highThree = 8
        }
      }
      if(combineHandSortByPoint[i].nine.length >=3){
        if(highThree<14){
          highThree = 9
        }
      }
      if(combineHandSortByPoint[i].ten.length >=3){
        if(highThree<14){
          highThree = 10
        }
      }
      if(combineHandSortByPoint[i].eleven.length >=3){
        if(highThree<14){
          highThree = 11
        }
      }
      if(combineHandSortByPoint[i].twelve.length >=3){
        if(highThree<14){
          highThree = 12
        }
      }
      if(combineHandSortByPoint[i].thirteen.length >=3){
        if(highThree<14){
          highThree = 13
        }
      }

      //check for two of a kind
      if(highThree !== 0){
        if(combineHandSortByPoint[i].one.length >=2){
          if(highTwo<14  && highThree!==14){
            highTwo = 14;
          }
        }
        if(combineHandSortByPoint[i].two.length >=2){
          if(highTwo<2  && highThree!==2){
            highTwo = 2;
          }
        }
        if(combineHandSortByPoint[i].three.length >=2){
          if(highTwo<3  && highThree!==3){
            highTwo = 3;
          }
        }
        if(combineHandSortByPoint[i].four.length >=2){
          if(highTwo<4  && highThree!==4){
            highTwo = 4;
          }
        }
        if(combineHandSortByPoint[i].five.length >=2){
          if(highTwo<5  && highThree!==5){
            highTwo = 5;
          }
        }
        if(combineHandSortByPoint[i].six.length >=2){
          if(highTwo<6  && highThree!==6){
            highTwo = 6;
          }
        }
        if(combineHandSortByPoint[i].seven.length >=2){
          if(highTwo<7  && highThree!==7){
            highTwo = 7;
          }
        }
        if(combineHandSortByPoint[i].eight.length >=2){
          if(highTwo<8  && highThree!==8){
            highTwo = 8;
          }
        }
        if(combineHandSortByPoint[i].nine.length >=2){
          if(highTwo<9  && highThree!==9){
            highTwo = 9;
          }
        }
        if(combineHandSortByPoint[i].ten.length >=2){
          if(highTwo<10  && highThree!==10){
            highTwo = 10;
          }
        }
        if(combineHandSortByPoint[i].eleven.length >=2){
          if(highTwo<11  && highThree!==11){
            highTwo = 11;
          }
        }
        if(combineHandSortByPoint[i].twelve.length >=2){
          if(highTwo<12  && highThree!==12){
            highTwo = 12;
          }
        }
        if(combineHandSortByPoint[i].thirteen.length >=2){
          if(highTwo<13  && highThree!==13){
            highTwo = 13;
          }
        }

        //check full house
        if(highTwo !==0 && highThree !==0){


          if(winner[i].winning<8){
            tempMessage = tempMessage.concat(['player'+i+' has a '+highThree+' high '+highTwo+' full house'])
            winner[i].winning=8
            winner[i].One=highThree
            winner[i].Two=highTwo
          }
        }


      }

    }
  }
  // check for flush
  for(let i=0; i<combineHand.length; i++){
    if(playerState[i]==='in'){
      if(combineHandSortBySuit[i].clubs.length >= 5){
        let high = combineHandSortBySuitWithAceInEnd[i].clubs[combineHandSortBySuitWithAceInEnd[i].clubs.length-1]

        if(winner[i].winning<7){
          tempMessage = tempMessage.concat(['player'+i+' has a '+high+' high flush'])
          winner[i].winning=7
          winner[i].One=high
        }
      }

      if(combineHandSortBySuit[i].diamonds.length >= 5){
        let high = combineHandSortBySuitWithAceInEnd[i].diamonds[combineHandSortBySuitWithAceInEnd[i].diamonds.length-1]

        if(winner[i].winning<7){
          tempMessage = tempMessage.concat(['player'+i+' has a '+high+' high flush'])
          winner[i].winning=7
          winner[i].One=high
        }
      }

      if(combineHandSortBySuit[i].hearts.length >= 5){
        let high = combineHandSortBySuitWithAceInEnd[i].hearts[combineHandSortBySuitWithAceInEnd[i].hearts.length-1]

        if(winner[i].winning<7){
          tempMessage = tempMessage.concat(['player'+i+' has a '+high+' high flush'])
          winner[i].winning=7
          winner[i].One=high
        }
      }

      if(combineHandSortBySuit[i].spades.length >= 5){
        let high = combineHandSortBySuitWithAceInEnd[i].spades[combineHandSortBySuitWithAceInEnd[i].spades.length-1]

        if(winner[i].winning<7){
          tempMessage = tempMessage.concat(['player'+i+' has a '+high+' high flush'])
          winner[i].winning=7
          winner[i].One=high
        }
      }
    }
  }
  //check for straight
  for(let i=0; i<combineHand.length; i++){
    if(playerState[i]==='in'){
      for(let j=0; j<combineHandWithAceInEndNoRepeat[i].length-4;j++){
        if(combineHandWithAceInEndNoRepeat[i][j+1] === combineHandWithAceInEndNoRepeat[i][j]+1 &&
          combineHandWithAceInEndNoRepeat[i][j+2] === combineHandWithAceInEndNoRepeat[i][j]+2 &&
          combineHandWithAceInEndNoRepeat[i][j+3] === combineHandWithAceInEndNoRepeat[i][j]+3 &&
          combineHandWithAceInEndNoRepeat[i][j+4] === combineHandWithAceInEndNoRepeat[i][j]+4){

            let high = combineHandWithAceInEndNoRepeat[i][j+4]

            if(winner[i].winning<6){
              tempMessage = tempMessage.concat(['player'+i+' has a '+high+' high straight'])
              winner[i].winning=6
              winner[i].One=high
            }
          }
      }
    }
  }
  //check for three of a kind
  for(let i=0; i<combineHand.length; i++){
    if(playerState[i]==='in'){
      let high = 0
      if(combineHandSortByPoint[i].one.length >= 3){
        if (high<14){
          high = 14

        }
      }
      if(combineHandSortByPoint[i].two.length >= 3){
        if (high<2){
          high = 2

        }
      }
      if(combineHandSortByPoint[i].three.length >= 3){
        if (high<3){
          high = 3

        }
      }
      if(combineHandSortByPoint[i].four.length >= 3){
        if (high<4){
          high = 4

        }
      }
      if(combineHandSortByPoint[i].five.length >= 3){
        if (high<5){
          high = 5

        }
      }
      if(combineHandSortByPoint[i].six.length >= 3){
        if (high<6){
          high = 6

        }
      }
      if(combineHandSortByPoint[i].seven.length >= 3){
        if (high<7){
          high = 7

        }
      }
      if(combineHandSortByPoint[i].eight.length >= 3){
        if (high<8){
          high = 8

        }
      }
      if(combineHandSortByPoint[i].nine.length >= 3){
        if (high<9){
          high = 9

        }
      }
      if(combineHandSortByPoint[i].ten.length >= 3){
        if (high<10){
          high = 10

        }
      }
      if(combineHandSortByPoint[i].eleven.length >= 3){
        if (high<11){
          high = 11

        }
      }
      if(combineHandSortByPoint[i].twelve.length >= 3){
        if (high<12){
          high = 12

        }
      }
      if(combineHandSortByPoint[i].thirteen.length >= 3){
        if (high<13){
          high = 13
        }
      }
      if(high !== 0){

        if(winner[i].winning<5){
          tempMessage = tempMessage.concat(['player'+i+' has a '+high+' high three of a kind'])
          winner[i].winning=5
          winner[i].One=high

          let One = 0;
          let Two = 0;

          for(let j=0;j<combineHandWithAceInEnd[i].length;j++){
            if(combineHandWithAceInEnd[i][j] !== high && combineHandWithAceInEnd[i][j] > One){
              One=combineHandWithAceInEnd[i][j]
            }
          }

          for(let k=0;k<combineHandWithAceInEnd[i].length;k++){
            if(combineHandWithAceInEnd[i][k] !== high && combineHandWithAceInEnd[i][k] > Two  && combineHandWithAceInEnd[i][k] !== One){
              Two=combineHandWithAceInEnd[i][k]
            }
          }
          winner[i].Two=One
          winner[i].Three=Two


        }
      }
    }
  }
  //check for two pairs
  for(let i=0; i<combineHand.length; i++){
    if(playerState[i]==='in'){

      let highTwo = 0
      let lowTwo = 0
      //check for high pair
      if(combineHandSortByPoint[i].one.length >=2){
        if(highTwo<14){
          highTwo = 14
        }
      }
      if(combineHandSortByPoint[i].two.length >=2){
        if(highTwo<14){
          highTwo = 2
        }
      }
      if(combineHandSortByPoint[i].three.length >=2){
        if(highTwo<14){
          highTwo = 3
        }
      }
      if(combineHandSortByPoint[i].four.length >=2){
        if(highTwo<14){
          highTwo = 4
        }
      }
      if(combineHandSortByPoint[i].five.length >=2){
        if(highTwo<14){
          highTwo = 5
        }
      }
      if(combineHandSortByPoint[i].six.length >=2){
        if(highTwo<14){
          highTwo = 6
        }
      }
      if(combineHandSortByPoint[i].seven.length >=2){
        if(highTwo<14){
          highTwo = 7
        }
      }
      if(combineHandSortByPoint[i].eight.length >=2){
        if(highTwo<14){
          highTwo = 8
        }
      }
      if(combineHandSortByPoint[i].nine.length >=2){
        if(highTwo<14){
          highTwo = 9
        }
      }
      if(combineHandSortByPoint[i].ten.length >=2){
        if(highTwo<14){
          highTwo = 10
        }
      }
      if(combineHandSortByPoint[i].eleven.length >=2){
        if(highTwo<14){
          highTwo = 11
        }
      }
      if(combineHandSortByPoint[i].twelve.length >=2){
        if(highTwo<14){
          highTwo = 12
        }
      }
      if(combineHandSortByPoint[i].thirteen.length >=2){
        if(highTwo<14){
          highTwo = 13
        }
      }

      //check for low pair
      if(highTwo !== 0){
        if(combineHandSortByPoint[i].one.length >=2){
          if(lowTwo<14  && highTwo!==14){
            lowTwo = 14;
          }
        }
        if(combineHandSortByPoint[i].two.length >=2){
          if(lowTwo<2  && highTwo!==2){
            lowTwo = 2;
          }
        }
        if(combineHandSortByPoint[i].three.length >=2){
          if(lowTwo<3  && highTwo!==3){
            lowTwo = 3;
          }
        }
        if(combineHandSortByPoint[i].four.length >=2){
          if(lowTwo<4  && highTwo!==4){
            lowTwo = 4;
          }
        }
        if(combineHandSortByPoint[i].five.length >=2){
          if(lowTwo<5  && highTwo!==5){
            lowTwo = 5;
          }
        }
        if(combineHandSortByPoint[i].six.length >=2){
          if(lowTwo<6  && highTwo!==6){
            lowTwo = 6;
          }
        }
        if(combineHandSortByPoint[i].seven.length >=2){
          if(lowTwo<7  && highTwo!==7){
            lowTwo = 7;
          }
        }
        if(combineHandSortByPoint[i].eight.length >=2){
          if(lowTwo<8  && highTwo!==8){
            lowTwo = 8;
          }
        }
        if(combineHandSortByPoint[i].nine.length >=2){
          if(lowTwo<9  && highTwo!==9){
            lowTwo = 9;
          }
        }
        if(combineHandSortByPoint[i].ten.length >=2){
          if(lowTwo<10  && highTwo!==10){
            lowTwo = 10;
          }
        }
        if(combineHandSortByPoint[i].eleven.length >=2){
          if(lowTwo<11  && highTwo!==11){
            lowTwo = 11;
          }
        }
        if(combineHandSortByPoint[i].twelve.length >=2){
          if(lowTwo<12  && highTwo!==12){
            lowTwo = 12;
          }
        }
        if(combineHandSortByPoint[i].thirteen.length >=2){
          if(lowTwo<13  && highTwo!==13){
            lowTwo = 13;
          }
        }

        //check if there is two pairs
        if(lowTwo !== 0 && highTwo !== 0){

          if(winner[i].winning<4){
            tempMessage = tempMessage.concat(['player'+i+' has a '+highTwo+' high '+lowTwo+' two pairs'])
            winner[i].winning=4
            winner[i].One=highTwo
            winner[i].Two=lowTwo

            let One = 0;

            for(let j=0;j<combineHandWithAceInEnd[i].length;j++){
              if(combineHandWithAceInEnd[i][j] !== highTwo && combineHandWithAceInEnd[i][j] > One  && combineHandWithAceInEnd[i][j] !== lowTwo){
                One=combineHandWithAceInEnd[i][j]
              }
            }
            winner[i].Three=One
          }
        }


      }



    }
  }
  //check for pair
  for(let i=0; i<combineHand.length; i++){
    if(playerState[i]==='in'){

      let high = 0
      if(combineHandSortByPoint[i].one.length >= 2){
        if (high<14){
          high = 14

        }
      }
      if(combineHandSortByPoint[i].two.length >= 2){
        if (high<2){
          high = 2

        }
      }
      if(combineHandSortByPoint[i].three.length >= 2){
        if (high<3){
          high = 3

        }
      }
      if(combineHandSortByPoint[i].four.length >= 2){
        if (high<4){
          high = 4

        }
      }
      if(combineHandSortByPoint[i].five.length >= 2){
        if (high<5){
          high = 5

        }
      }
      if(combineHandSortByPoint[i].six.length >= 2){
        if (high<6){
          high = 6

        }
      }
      if(combineHandSortByPoint[i].seven.length >= 2){
        if (high<7){
          high = 7

        }
      }
      if(combineHandSortByPoint[i].eight.length >= 2){
        if (high<8){
          high = 8

        }
      }
      if(combineHandSortByPoint[i].nine.length >= 2){
        if (high<9){
          high = 9

        }
      }
      if(combineHandSortByPoint[i].ten.length >= 2){
        if (high<10){
          high = 10

        }
      }
      if(combineHandSortByPoint[i].eleven.length >= 2){
        if (high<11){
          high = 11

        }
      }
      if(combineHandSortByPoint[i].twelve.length >= 2){
        if (high<12){
          high = 12

        }
      }
      if(combineHandSortByPoint[i].thirteen.length >= 2){
        if (high<13){
          high = 13

        }
      }
      if (high !== 0){


        if(winner[i].winning<3){
          tempMessage = tempMessage.concat(['player'+i+' has a '+high+' high pair'])
          winner[i].winning=3
          winner[i].One=high

          let One = 0;
          let Two = 0;
          let Three = 0;

          for(let j=0;j<combineHandWithAceInEnd[i].length;j++){
            if(combineHandWithAceInEnd[i][j] !== high && combineHandWithAceInEnd[i][j] > One){
              One=combineHandWithAceInEnd[i][j]
            }
          }

          for(let k=0;k<combineHandWithAceInEnd[i].length;k++){
            if(combineHandWithAceInEnd[i][k] !== high && combineHandWithAceInEnd[i][k] > Two  && combineHandWithAceInEnd[i][k] !== One){
              Two=combineHandWithAceInEnd[i][k]
            }
          }

          for(let l=0;l<combineHandWithAceInEnd[i].length;l++){
            if(combineHandWithAceInEnd[i][l] !== high && combineHandWithAceInEnd[i][l] > Three  && combineHandWithAceInEnd[i][l] !== One && combineHandWithAceInEnd[i][l] !== Two){
              Three=combineHandWithAceInEnd[i][l]
            }
          }
          winner[i].Two=One
          winner[i].Three=Two
          winner[i].Four=Three

        }
      }

    }
  }
  //check for high card
  for(let i=0; i<combineHand.length; i++){
    if(playerState[i]==='in'){
      let high = combineHandWithAceInEnd[i][combineHandWithAceInEnd[i].length-1]

      if(winner[i].winning<2){
        tempMessage = tempMessage.concat(['player'+i+' has a '+high+' high card'])
        winner[i].winning=2
        winner[i].One=high
        winner[i].Two=combineHandWithAceInEnd[i][combineHandWithAceInEnd[i].length-2]
        winner[i].Three=combineHandWithAceInEnd[i][combineHandWithAceInEnd[i].length-3]
        winner[i].Four=combineHandWithAceInEnd[i][combineHandWithAceInEnd[i].length-4]
        winner[i].Five=combineHandWithAceInEnd[i][combineHandWithAceInEnd[i].length-5]
      }
    }
  }
  return {tempMessage: tempMessage,
          winner: winner
          }

}
