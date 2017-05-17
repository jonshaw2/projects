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
    let seat0
    let seat1
    console.log(this.props.table);
    if(this.props.table.tableInfo){
      table = this.props.table;
      tableName = table.tablename;
    }
    if(this.props.table.Seat[0]){
      seat0 = <button onClick={()=>this.props.standSeat0(0)}>Stand Up 0</button>
    } else(
      seat0 = <button onClick={()=>this.props.sitSeat0(0)}>Sit Down 0</button>
    )

    // function getCardImageUrl(card) {
    //   var cardNumber = card.point;
    //   var cardSuit = card.suit;
    //   if (cardNumber === 1){
    //     cardNumber = 'ace';
    //   }
    //   else if (cardNumber === 11){
    //     cardNumber = 'jack';
    //   }
    //   else if (cardNumber === 12){
    //     cardNumber = 'queen';
    //   }
    //   else if (cardNumber === 13){
    //     cardNumber = 'king';
    //   }
    //
    //   return 'images/' + cardNumber + '_of_' + cardSuit + '.png';
    // }

    let player0Hand = '';
    if(this.props.table.playerHand[0].length > 0){
      console.log(this.props.table.playerHand[0][0].point);
      console.log(this.props.table.playerHand[0][0].suit);
      player0Hand =
      <div>


        <img src={require("../images/" + this.props.table.playerHand[0][0].point + '_of_' + this.props.table.playerHand[0][0].suit + '.png')} height="100"/>
        <img src={require("../images/" + this.props.table.playerHand[0][1].point + '_of_' + this.props.table.playerHand[0][1].suit + '.png')} height="100"/>
      </div>
    }

    return(
      <div>
        {tableName}
        <div className='table'>
        testing
        {seat0}
        <button onClick={()=>this.props.Deal()}>Deal</button>
        {player0Hand}
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
