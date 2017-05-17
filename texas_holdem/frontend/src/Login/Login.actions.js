import $ from 'jquery';
import { hashHistory} from 'react-router';

function wikiError(resp){
  console.log('error:', resp);
  return;
}

function submit(data){
  hashHistory.push('/');
  return {type: 'submitLogin', data:data}
}

export function changePassword(password){
  return {type: 'passwordChange',password: password}
}
export function changeUsername(username){
  return {type: 'usernameChange', username: username}
}

export function logout(){
  console.log('hi');
  return {type: 'logOut'}
}

export function submitLogin(username, password){
  console.log(username);
  console.log(password);
  let asyncAction = function(dispatch){
    $.ajax({
      url: 'http://localhost:7000/api/user/login',
      data: JSON.stringify({
        username: username,
        password: password
      }),
      method: 'post',
      dataType: 'JSON',
      contentType: 'application/json'
    })
    .then(data => dispatch(submit(data)))
    .catch(resp => dispatch(wikiError(resp)))
  };
  return asyncAction;
}
