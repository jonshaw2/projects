import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Login.actions';

class Login extends React.Component {
  render() {
    let username = this.props.loginUser.username;
    let password = this.props.loginUser.password;
    return (
      <div>
      <h3>Login</h3>
        Username : <input type="text" value={username} onChange={event=> this.props.changeUsername(event.target.value)}/><br/>
        Password   : <input type="password" value={password} onChange={event=> this.props.changePassword(event.target.value)}/><br/>
        <button onClick={(event)=>{this.props.submitLogin(username, password);}}>Submit</button>
      </div>
    );
  }
}

const LoginContainer = ReactRedux.connect(
  state => ({
    loginUser: state.loginUser
  }),
  actions
)(Login);

export default LoginContainer;
