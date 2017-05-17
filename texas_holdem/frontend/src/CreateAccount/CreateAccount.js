import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './CreateAccount.actions';

class CreateAccount extends React.Component {
  render() {

    let username = this.props.user.username;
    let password = this.props.user.password;
    let name = this.props.user.name;
    let email = this.props.user.email;

    return (
      <div>
        <div>
        <h3>Sign Up</h3>
          Username: <input type="text" value={username} onChange={event=> this.props.changeUsername(event.target.value)}/><br/>
          Password: <input type="password" value={password} onChange={event=> this.props.changePassword(event.target.value)}/><br/>
          Name: <input type="text" value={name} onChange={event=> this.props.changeName(event.target.value)}/><br/>
          Email: <input type="text" value={email} onChange={event=> this.props.changeEmail(event.target.value)}/><br/>
          <button onClick={(event) => {this.props.createAccount(username, password, name, email);}}>SUBMIT</button>

        </div>
      </div>
    );
  }
}

const CreateAccountContainer = ReactRedux.connect(
  state => ({
    user: state.createUser
  }),
  actions
)(CreateAccount);

export default CreateAccountContainer;
