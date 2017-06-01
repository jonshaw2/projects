import $ from 'jquery';
import { hashHistory} from 'react-router';
import BASEURL from '../baseurl';

function tableRedirect(){
  hashHistory.push('/');
  return {type: 'addTable'}
}

function tableError(resp){
  console.log('error:',resp);
  return;
}

export function changeTableName(tablename){
  return {type: 'changeTableName', tablename: tablename}
}

export function changeAiChips(aichips){
  return {type: 'changeAiChips', aichips:aichips}
}

export function changeProbability(probabilityassist){
  return {type: 'changeProbabilityAssist', probabilityassist: probabilityassist}
}

export function createTable(user_id,tablename, probabilityassist, aichips, token){
  let asyncAction = function(dispatch){
    $.ajax({
      url: `${BASEURL}/api/user/createtable`,
      data: JSON.stringify({
        account_id: user_id,
        table_name: tablename,
        probability_assist: probabilityassist,
        aichips: aichips,
        token: token
      }),
      method: 'post',
      dataType: 'JSON',
      contentType: 'application/json'
    })
    .then(data => dispatch((tableRedirect())))
    .catch(resp => dispatch(tableError(resp)))
  };
  return asyncAction;
}
