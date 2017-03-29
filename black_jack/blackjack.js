$(document).ready(function(){
  var currentDeck = newDeck();
  shuffleCard();
  $('#dealer-points').hide();
  var firstCardToDisplay;

  var dealerCards = []; //cards in dealer's hands
  var playerCards = []; //cards in player's hands
  var dealerScore = 0;
  var playerScore = 0;
  var currPlayer = 'Player';

  $('#deal-button').click(function(){

    deal();
    updateScore();

    $('.hit_button').css('pointer-events', 'auto');
    $('.hit_button').css('background-color', 'lightblue');
    $('.stand_button').css('pointer-events', 'auto');
    $('.stand_button').css('background-color', 'lightblue');
    $('.deal_button').css('pointer-events', 'none');
    $('.deal_button').css('background-color', 'black');
  });

  $('#hit-button').click(function(){

    dealCard();
    updateScore();
    bust();

  });

  $('#stand-button').click(function(){

    // $('#first_card').css('-webkit-animation','spin 2s linear 1');
    // $('#first_card').css('-moz-animation','spin 2s linear 1');

    $('.first_card').css('-webkit-animation','linear 1');
    $('.first_card').css('-webkit-animation-name','spin');
    $('.first_card').css('animation-fill-mode','forwards');
    $('.first_card').css('-webkit-animation-duration',' 1s');

    $('.hidden_card').css('-webkit-animation',' linear 1');
    $('.hidden_card').css('animation-fill-mode','forwards');
    $('.hidden_card').css('-webkit-animation-name','spin');
    $('.hidden_card').css('-webkit-animation-duration','1s');
    setTimeout(function(){
      $('.first_card').css('opacity','1');
      $('.hidden_card').css('opacity','0');
    }, 500);

    // $('@-moz-keyframes spin').html('50% { -moz-transform: rotateY(90deg); }');
    // $('@-webkit-keyframes spin').html('50% { -webkit-transform: rotateY(90deg); } ');
    // $('@keyframes spin').html(' 50% { -webkit-transform: rotateY(90deg); transform:rotateY(90deg); } ');


    $('#dealer-points').show();
    currPlayer = 'Dealer';
    while (dealerScore < 17) {
      dealCard();
      updateScore();
      bust();
    }
    $('.hit_button').css('pointer-events', 'none');
    $('.hit_button').css('background-color', 'black');
    $('.stand_button').css('pointer-events', 'none');
    $('.stand_button').css('background-color', 'black');
    gameOver();

  });

  $('#restart-button').click(function() {
    $('.restart_button').css('pointer-events', 'none');
    $('.restart_button').css('background-color', 'black');
    restart();
  });





  function bust() {
    console.log(dealerScore);
    if (dealerScore > 21) {
      $('#messages').text('Dealer Busted Player Won');
      gameOver();
    }
    if (playerScore > 21) {
      $('#messages').text('Player Busted Dealer Won');
      gameOver();
    }

  }

  function gameOver() {
    if (dealerScore === playerScore) {
      $('#messages').text('Draw');
    }
    else if (dealerScore > playerScore && dealerScore <= 21) {
      $('#messages').text('Dealer won');
    }
    else if (playerScore > dealerScore && playerScore <= 21){
      $('#messages').text('Player won');
    }
    $('.restart_button').css('pointer-events', 'auto');
    $('.restart_button').css('background-color', 'lightblue');
    $('.hit_button').css('pointer-events', 'none');
    $('.hit_button').css('background-color', 'black');
    $('.stand_button').css('pointer-events', 'none');
    $('.stand_button').css('background-color', 'black');
  }

  function restart() {
    $('#dealer-points').hide();
    dealerCards = []; //cards in dealer's hands
    playerCards = []; //cards in player's hands
    dealerScore = 0;
    playerScore = 0;
    currPlayer = 'Player';
    console.log('test');

    $('#dealerHand').text("");
    $('#playerHand').text("");
    $('#dealer-points').text("");
    $('#player-points').text("");
    $('#messages').text("Blackjack!!!!!");
    $('.deal_button').css('pointer-events', 'auto');
    $('.deal_button').css('background-color', 'lightblue');
  }

  function shuffleCard(){
    var shufflingList = [];


    while (currentDeck.length >0){
      var chosenCard = Math.floor(Math.random()* (currentDeck.length - 1));
      var splice =(currentDeck.splice(chosenCard, 1));
      shufflingList.push(splice[0]);


    }
    currentDeck = shufflingList;


  }

  function dealCard(){

  var cardToDisplay = getCardImageUrl(currentDeck[currentDeck.length-1]);
    if (currPlayer === 'Player'){
      $('#playerHand').append('<img class="cardImages" src="'+cardToDisplay+ '">');
      playerSplice =(currentDeck.pop());
      playerCards.push(playerSplice); //add cards to paleyr's hand

}

    else if(currPlayer === 'Dealer'){
      $('#dealerHand').append('<img class="cardImages" src="'+cardToDisplay+ '">');
      dealerSplice =(currentDeck.pop());
      dealerCards.push(dealerSplice); //add cards to dealer's hand

    }
  }


  function updateScore(){
    dealerScore = calculatePoints(dealerCards);
    playerScore = calculatePoints(playerCards);

    $('#dealer-points').text(dealerScore);
    $('#player-points').text(playerScore);


  }

  function deal(){
    var dealerSplice = [];
    var playerSplice = [];
    for (i=0; i<4; i++){
      var cardToDisplay = getCardImageUrl(currentDeck[currentDeck.length-1]);

      if (i===1){ //pass two cards to dealer
      $('#dealerHand').append('<img class="cardImages" src="'+ cardToDisplay + '">');
      dealerSplice =(currentDeck.pop());
      dealerCards.push(dealerSplice); //add cards to dealer's hand
      }
      else if (i===0){
        firstCardToDisplay = cardToDisplay;
        $('#dealerHand').append('<img class="first_card" src='+firstCardToDisplay+'>');
        $('#dealerHand').append('<img class="hidden_card" src="images/card_back.jpg">');

        dealerSplice =(currentDeck.pop());
        dealerCards.push(dealerSplice);

      }
      else { // pass two cards to player
          $('#playerHand').append('<img class="cardImages" src="'+ cardToDisplay + '">');
          playerSplice =(currentDeck.pop());
          playerCards.push(playerSplice); //add cards to paleyr's hand
      }
    }
  }


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
        for (k = 0; k<3; k++){
          deck.push({point: points[i], suit: suits[j]});
        }
      }
    }
    return deck;
  }


});
