import $ from 'jquery';
import BASEURL from '../baseurl';

function tableInfo(data){
  return {type: 'table_initiate', payload: data.table, userchips: data.account.chips};
}
function tableError(resp){
  let error = (resp && resp.responseJSON && resp.responseJSON.message) || 'Something went wrong!';
  console.log(error);
}

export function sitDown(seat, data){

  return {type: 'sitDown', seat:seat, payload:data}
}

export function Fold(){
  return {type: 'fold'}
}

export function sitSeat(seat, id){

  let asyncAction = function(dispatch){
    $.ajax({
      url: `${BASEURL}/api/tables/userInfo`,
      data: JSON.stringify({
        id: id,
      }),
      method: 'post',
      dataType: 'JSON',
      contentType: 'application/json'
    })
    .then(data => dispatch(sitDown(seat,data)))
    .catch(resp => dispatch(tableError(resp)))
  };
  return asyncAction;
}

export function standSeat(seat){

  return {type: 'standUp', seat:seat}
}

export function Deal(){

  return {type: 'Deal'}
}

export function Stand(){
  return {type: 'Stand'}
}



export function Reset(){
  return {type: 'Reset'}
}

export function Raise(){
  return {type: 'Raise'}
}


export function ChangeBet(index, change){
  return {type: 'ChangeBet', index: index, change: change}
}

export function storeData(chips, aichip, user_id, table_id){

  let asyncAction = function(dispatch){
    $.ajax({
      url: `${BASEURL}/api/user/modifyChips`,
      data: JSON.stringify({
        chips: chips,
        aichip: aichip,
        user_id: user_id,
        table_id: table_id
      }),
      method: 'post',
      dataType: 'JSON',
      contentType: 'application/json'
    })
    .catch(resp => dispatch(tableError(resp)))
  };
  return asyncAction;
}

export function getTable(id, user_id){

  let asyncAction = function(dispatch){
    $.ajax({
      url: `${BASEURL}/api/tables/` + id,
      method: 'get',
      data: {
        user_id: user_id
      },
      dataType: 'JSON',
      contentType: 'application/json'
    })
    .then(data => dispatch(tableInfo(data)))
    .catch(resp => dispatch(tableError(resp)))
  };
  return asyncAction;
}
