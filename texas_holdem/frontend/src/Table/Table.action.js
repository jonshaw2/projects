import $ from 'jquery';

function tableInfo(data){

  return {type: 'table_initiate', payload: data};
}
function tableError(resp){
  let error = (resp && resp.responseJSON && resp.responseJSON.message) || 'Something went wrong!';
  console.log(error);
}

export function sitSeat0(seat){
  console.log('seat');
  return {type: 'sitDown', seat:seat}
}

export function standSeat0(seat){
  console.log('stand');
  return {type: 'standUp', seat:seat}
}

export function Deal(){
  console.log('Deal');

  // create new deck
  let deck = []
  let points = [1,2,3,4,5,6,7,8,9,10,11,12,13];
  let suits = ['spades','hearts','clubs','diamonds'];
  for (let i=0; i<points.length; i++){
    for (let j=0; j<suits.length; j++){
      for (let k = 0; k<3; k++){
        deck.push({point: points[i], suit: suits[j]});
      }
    }
  }

  //shuffle deck

  
  return {type: 'Deal'}
}


export function getTable(id){
  let asyncAction = function(dispatch){
    $.ajax({
      url: 'http://localhost:7000/api/tables/' + id,
      method: 'get',
      dataType: 'JSON',
      contentType: 'application/json'
    })
    .then(data => dispatch(tableInfo(data)))
    .catch(resp => dispatch(tableError(resp)))
  };
  return asyncAction;
}
