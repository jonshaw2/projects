import $ from 'jquery';

function tableInfo(data){

  return {type: 'table_initiate', payload: data};
}
function tableError(resp){
  let error = (resp && resp.responseJSON && resp.responseJSON.message) || 'Something went wrong!';
  console.log(error);
}

export function sitSeat(seat){
  console.log('seat');
  return {type: 'sitDown', seat:seat}
}

export function standSeat(seat){
  console.log('stand');
  return {type: 'standUp', seat:seat}
}

export function Deal(){
  console.log('Deal');
  return {type: 'Deal'}
}

export function Stand(){
  return {type: 'Stand'}
}

export function Reset(){
  return {type: 'Reset'}
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
