import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Table.action';

class Gallery extends React.Component{
componentDidMount() {

  this.props.getTable(this.props.params.id);
}

  render(){
    let tableName = '';

    let table
    let seat = new Array(4)
    console.log(this.props.table);
    if(this.props.table.tableInfo){
      table = this.props.table;
      tableName = table.tablename;
    }


    for (let i=0; i<4; i++){
      if(this.props.table.Seat[i]){
        seat[i] = <button onClick={()=>this.props.standSeat(i)}>Stand Up i</button>
      } else(
        seat[i] = <button onClick={()=>this.props.sitSeat(i)}>Sit Down i</button>
      )
    }




    let player0Hand = '';
    let player1Hand = '';
    let player2Hand = '';
    let player3Hand = '';
    if(this.props.table.playerHand[0].length > 0){
      console.log(this.props.table.playerHand[0][0].point);
      console.log(this.props.table.playerHand[0][0].suit);
      player0Hand =
      <div>
        <img src={require("../images/" + this.props.table.playerHand[0][0].point + '_of_' + this.props.table.playerHand[0][0].suit + '.png')} height="100"/>
        <img src={require("../images/" + this.props.table.playerHand[0][1].point + '_of_' + this.props.table.playerHand[0][1].suit + '.png')} height="100"/>
      </div>
    }

    if(this.props.table.playerHand[1].length > 0){
      console.log('player1',this.props.table.playerHand[1][0].point);
      console.log(this.props.table.playerHand[1][0].suit);
      player1Hand =
      <div>
        <img src={require("../images/" + this.props.table.playerHand[1][0].point + '_of_' + this.props.table.playerHand[1][0].suit + '.png')} height="100"/>
        <img src={require("../images/" + this.props.table.playerHand[1][1].point + '_of_' + this.props.table.playerHand[1][1].suit + '.png')} height="100"/>
      </div>
    }

    let message='test'
    if (this.props.message){
      message = this.props.message
    }

    let player0ActionButton = ''
    let currentStatus = this.props.table.currentStatus;
    if (currentStatus === 'Waiting'){
      player0ActionButton = <button onClick={()=>this.props.Deal()}>Deal</button>
    } else if (currentStatus === 'cardDealt' || currentStatus === 'riverOne' || currentStatus === 'riverTwo' || currentStatus === 'riverThree' ){
      player0ActionButton = <button onClick={()=>this.props.Stand()}>Stand</button>
    }

    let riverHand = '';
    console.log('riverHand',this.props.table.riverHand);
    if (this.props.table.riverHand[0] !== undefined){
      console.log('riverHand',this.props.table.riverHand);
      console.log('in river map');
      riverHand =
      <div className="river">
        {this.props.table.riverHand.map((hand, idx) =>
                <img key={idx} src={require("../images/" + hand.point + '_of_' + hand.suit + '.png')} height="100"/>
        )}
      </div>
    }


    return(
      <div>
        {tableName}
        <div className='table'>
        testing
        <button onClick={()=>this.props.Reset()}>Reset</button> <br/>
        <div className='player1'>
        {seat[1]}
        {player1Hand}
        </div>
        <div className='riverCards'>
          {riverHand}
        </div>
        <div className='player0'>
          {seat[0]}
          {player0Hand}
          {player0ActionButton}
        </div>
        </div>
        <div className="tableMessage">
        {message}
        </div>
      </div>
    );
  }
}

const TableContainer = ReactRedux.connect(
  state=>({
    table: state.table,
    loginUser: state.loginUser
  }),
  actions
)(Gallery);

export default TableContainer;
