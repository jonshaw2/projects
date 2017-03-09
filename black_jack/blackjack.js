$(document).ready(function(){

  $('#deal-button').click(function(){


    var currentDeck = newDeck();
    var chosenCard = Math.floor(Math.random()* 52);

    getCardImageUrl(currentDeck[chosenCard]);

    $('#dealerHand').append('<img class="cardImages" src="'+getCardImageUrl(currentDeck[chosenCard])+ '">');
  });

  function getCardImageUrl(card) {
    var cardNumber = card.point;
    var cardSuit = card.suit;
    if (cardNumber === 1){
      cardNumber = 'ace';
    }
    else if (cardNumber === 11){
      cardNumber = 'jack';
    }
    else if (cardNumber === 12){
      cardNumber = 'queen';
    }
    else if (cardNumber === 13){
      cardNumber = 'king';
    }

    return 'images/' + cardNumber + '_of_' + cardSuit + '.png';
  }

  function calculatePoints(card){
    if (card[0].point > 10){
      card[0].point = 10;
    }
    if (card.length > 1){
      var a=0;
      var sumPoints = card.reduce(function(b, a){
        if (a.point>=10){
          a.point = 10;
        }
        return a.point + b;
      }, 0);


      if (sumPoints <= 11){
        var contains_ace = false;
        for (j=0; j<card.length; j++){
          if (card[j].point === 1){
            contains_ace = true;
          }
        }
        if (contains_ace === true){
          sumPoints += 10;
        }

      }
      return sumPoints;
    }
    if (card.length === 1){
      return card[0].point;
    }
  }

  function newDeck(){
    var deck = [];
    var points = [1,2,3,4,5,6,7,8,9,10,11,12,13];
    var suits = ['spades','hearts','clubs','diamonds'];
    for (i=0; i<points.length; i++){
      for (j=0; j<suits.length; j++){
        deck.push({point: points[i], suit: suits[j]});
      }

    }
    return deck;
  }


})
