import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './CreateTable.actions';

class CreateTable extends React.Component {
  render() {
    let tablename = this.props.createtable.tablename;
    let probabilityassist = this.props.createtable.probabilityassist;
    let aichips = this.props.createtable.aichips;
    let user_id = this.props.loginUser.id;
    let token = this.props.loginUser.currentToken;
    let probabilityButton = ''
    if(probabilityassist === 'false'){
      probabilityButton =
      <div>
      Probability Assist: <button onClick={(event) => {this.props.changeProbability('true')}}>Off</button>
      </div>

    } else{
      probabilityButton =
      <div>
      Probability Assist: <button onClick={(event) => {this.props.changeProbability('false')}}>On</button>
      </div>
    }

    return (
      <div>
        <div className='signup'>
        <h3>Create Table</h3>
          Table Name: <input type="text" value={tablename} onChange={event=> this.props.changeTableName(event.target.value)}/><br/>
          ai chips: <input type="number" value={aichips} onChange={event=> this.props.changeAiChips(event.target.value)}/><br/>
          {probabilityButton}

          <button onClick={(event) => {this.props.createTable(user_id,tablename, probabilityassist, aichips, token)}}>SUBMIT</button>

        </div>
      </div>
    );
  }
}

const CreateTableContainer = ReactRedux.connect(
  state => ({
    createtable: state.createTable,
    loginUser: state.loginUser
  }),
  actions
)(CreateTable);

export default CreateTableContainer;
