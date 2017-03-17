$(document).ready(function(){



  function Card(points, suits){
    this.point = points;
    this.suit = suits;
  }

  Card.prototype.getImageUrl = function() {
    var returnCard = this.point;
    if (this.point === 11){
      returnCard ="jack";
    }
    else if (this.point === 12){
      returnCard ="queen";
    }
    else if (this.point === 13){
      returnCard = "king";
    }
    else if (this.point === 1){
      returnCard = "ace";
    }
    imageUrl = 'images/' + returnCard + '_of_' + this.suit+'.png';
    return imageUrl;
  };

  function Hand(){
    this.cardsInHand = [];
  }

  Hand.prototype.addCard = function(card){
    this.cardsInHand.push(card);
  };

  Hand.prototype.getPoints = function(){
    var sumPoints = this.cardsInHand.reduce(function(a, b){
      if (b.point>10){
        b.point=10;
      }
      return a + b.point;
    },0);
    return sumPoints;
  };

  function DealCard(hand, field_class){
    var card_to_add = current_deck.draw();
    hand.addCard(card_to_add);

    var cardToDisplay = card_to_add.getImageUrl();
    $(field_class).append('<img class="playing_card" src='+cardToDisplay+'>');
  }

  function DealBlankCard(hand, field_class){
    var card_to_add = current_deck.draw();
    hand.addCard(card_to_add);

    var cardToDisplay = card_to_add.getImageUrl();
    $(field_class).append('<img class="first_card" src='+cardToDisplay+'>');
    $(field_class).append('<img class="playing_card" src="images/card_back.jpg">');
  }

  function Deck(){
    this.currentDeck = [];
    var suits = ['clubs','diamonds','hearts','spades'];
    var points = [1,2,3,4,5,6,7,8,9,10,11,12,13];
    for (i=0; i<points.length;i++){
      for (j=0; j<suits.length;j++){
        this.currentDeck.push(new Card(points[i],suits[j]));
      }
    }
  }


  Deck.prototype.draw = function() {
    return this.currentDeck.pop();
  };

  Deck.prototype.shuffle = function() {
    var tempDeck = [];
    while (this.currentDeck.length > 0){
      randomCard = Math.floor(Math.random()*(this.currentDeck.length));
      splice = this.currentDeck.splice(randomCard,1);
      tempDeck.push(splice[0]);
    }
    this.currentDeck = tempDeck;
  };

  Deck.prototype.numCardsLeft = function(){
    return this.currentDeck.length;
  };

  //initial veriables
  var current_deck = new Deck();
  current_deck.shuffle();
  var dealer_hand = new Hand();
  var player_hand = new Hand();
  dealer_hand.card_class = '.dealer_card_field';
  dealer_hand.text_class = 'test';
  player_hand.card_class = '.player_card_field';
  player_hand.text_class = 'test';

  $('#deal-button').click(function(){

    // deal();
    // updateScore();

    console.log(dealer_hand);
    DealBlankCard(dealer_hand, dealer_hand.card_class);
    DealCard(dealer_hand, dealer_hand.card_class);

    DealCard(player_hand, player_hand.card_class);
    DealCard(player_hand, player_hand.card_class);

    $('.hit_button').css('pointer-events', 'auto');
    $('.hit_button').css('background-color', 'lightblue');
    $('.stand_button').css('pointer-events', 'auto');
    $('.stand_button').css('background-color', 'lightblue');
    $('.deal_button').css('pointer-events', 'none');
    $('.deal_button').css('background-color', 'black');
  });

  $('#hit-button').click(function(){
    DealCard(player_hand, player_hand.card_class);
    // dealCard();
    // updateScore();
    // bust();

  });

});
