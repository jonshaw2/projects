
$(document).ready(function() {

  var AI = false;
  var player_turn = 1;
  var player_1_score = 0;
  var player_2_score = 0;
  var winner = 0;
  var top_left = 'top_left';
  var top_mid = 'top_mid';
  var top_right = 'top_right';
  var mid_left = 'mid_left';
  var mid_mid = 'mid_mid';
  var mid_right = 'mid_right';
  var bot_left = 'bot_left';
  var bot_mid = 'bot_mid';
  var bot_right = 'bot_right';
  var AI_move = false;
  var tile = [[top_left,top_mid,top_right],[mid_left,mid_mid,mid_right],[bot_left,bot_mid,bot_right]];
  var tile_container = [[0,0,0],[0,0,0],[0,0,0]];
  var x_start;
  var x_end;
  var y_start;
  var y_end;
  var draw = true;

  $('.AI').on('click','.AI_check',function(){
    if ($(this).is(':checked')) {
      AI = true;
      console.log(AI);
      if (player_turn === -1 ){
        AI_turn();
      }
    }
    if ($(this).is(':not(:checked)')) {
      AI = false;
      console.log(AI);
    }
  });

  $('.restart').click(function(){
    console.log('restarting');
    tile_container = [[0,0,0],[0,0,0],[0,0,0]];
    winner = 0;
    player_turn = 1;
    result='none';
    AI_move = false;
    $('.condition').text("");
    for (i=0; i<3; i++){
      for (j=0; j<3; j++){
        $('.'+tile[i][j]).text("");
      }
    }


  });

  $('.tic_buttons').on('click','button',function() {
    for (i=0;i<3;i++){
      for (j=0; j<3;j++){
        if ($(this).hasClass(tile[i][j]) && tile_container[i][j]===0){
          if (player_turn === 1){
            $(this).text('O');
            console.log('after printing O');

            tile_container[i][j]=1;
            player_turn *= -1;
          }
          else if (player_turn === -1 && AI !== true){
            $(this).text('X');
            player_turn *= -1;
            tile_container[i][j]=-1;
          }

          else{


          }



        }
      }
    }

    win_condition();

    draw = true;
    for(i=0; i<3;i++){
      for(j=0; j<3; j++){
        if (tile_container[i][j] === 0){
          draw = false;
        }
      }
    }
    if (draw === true){
      $('.condition').text("Draw!");
    }

    if (AI === true && player_turn === -1 && draw === false){

      AI_turn();

    }



  });
  function AI_turn(){
    AI_move = false;
    console.log('before waiting');
    setTimeout(function(){

      while (AI_move === false){
        var i = Math.floor(Math.random() * 3);
        var j = Math.floor(Math.random() * 3);
        console.log(tile_container);
        console.log(i);
        console.log(j);
        console.log(tile_container[i][j]);
        if (tile_container[i][j] === 0){
          tile_container[i][j] = -1;
          AI_move = true;
          player_turn *= -1;
          $('.'+tile[i][j]).text("X");
        }

      }
    }, 1000);

    win_condition();
  }

  function win_condition(){

    result = check_condition(tile_container, player_turn);
    if (result !== 'none'){
      if (result == 1){
        console.log('player 1 win!');
        player_1_score += 1;
        $('.condition').text("player 1 win!");
        $('.score').html("Player 1: "+player_1_score+" "+"<br> Player 2: "+player_2_score+" ");
        player_turn = 3;
      }
      else if (result == -1) {
        console.log('player 2 win!');
        player_2_score += 1;
        $('.condition').html("player 2 win!");
        $('.score').html("Player 1: "+player_1_score+" "+"<br> Player 2: "+player_2_score+" ");
        player_turn = 3;
      }

    }

    if (AI === true){
      console.log("AI TAKE OVER");
    }

  }

  function check_condition(check, player){

    for (var i=0; i<3; i++){


      if (check[0+i][0] == check[0+i][1] && check[0+i][1] == check[0+i][2] && check[0+i][0]!== 0){
        x_start = i;
        x_end = i;
        y_start = 0;
        y_start = 2;


        return (player)*-1;
      }
      else if (check[0][0+i] == check[1][0+i] && check[1][0+i] == check[2][0+i] && check[0][0+i]!== 0){
        x_start = 0;
        x_end = 2;
        y_start = i;
        y_end = i;


        return (player)*-1;
      }
      else{

      }
    }
    if (check[0][0] === check[1][1] && check[1][1] === check[2][2] && check[0][0]!== 0){
      x_start = i;
      x_end = i;
      y_start = 0;
      y_start = 2;
      return (player)*-1;
    }

    if (check[0][2] === check[1][1] && check[1][1] === check[2][0] && check[0][2]!== 0){
      x_start = i;
      x_end = i;
      y_start = 0;
      y_start = 2;
      return (player)*-1;
    }


    return 'none';
  }
});
