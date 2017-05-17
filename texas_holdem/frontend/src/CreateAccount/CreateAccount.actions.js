import $ from 'jquery';
import { hashHistory} from 'react-router';

function accountRedirect(){
  hashHistory.push('/');
  return {type: 'addAccount'}
}

function accountError(resp){
  console.log('error:',resp);
  return;
}

export function changeUsername(username){
  return{type:'changeUsername', username:username};
}
export function changeName(name){
  return{type:'changeName', name:name};
}

export function changeEmail(email){
  return{type:'changeEmail', email:email};
}

export function changePassword(password){
  return{type:'changePassword', password:password};
}

export function createAccount(username, password, name, email){
  let asyncAction = function(dispatch){
    $.ajax({
      url: 'http://localhost:7000/api/user/signup',
      data: JSON.stringify({
        username: username,
        name: name,
        email: email,
        password: password
      }),
      method: 'post',
      dataType: 'JSON',
      contentType: 'application/json'
    })
    .then(data => dispatch((accountRedirect())))
    .catch(resp => dispatch(accountError(resp)))
  };
  return asyncAction;
}
