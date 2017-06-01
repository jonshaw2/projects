import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Table.action';
import {playerAssist} from './UserAssist';

class Gallery extends React.Component{
componentDidMount() {
  this.props.getTable(this.props.params.id, this.props.loginUser.id);
}

  render(){

    if(this.props.table.currentStatus==='end'){
      this.props.storeData(this.props.table.chips[0], this.props.table.chips[1], this.props.loginUser.id, this.props.table.tableInfo.id)
    }
    if(this.props.table.raiseButton === true){
      this.props.Stand();
    }

    let tableName = '';

    let table
    let seat = new Array(4)
    let probabilityAssist = ''
    if(this.props.table.tableInfo){
      table = this.props.table;
      tableName = table.tablename;
      if (this.props.table.tableInfo.probability_assist === 'true'  && this.props.table.playerHand[0].length > 0){
        let userWinRate = playerAssist(this.props.table.playerState,this.props.table.playerHand,this.props.table.riverHand,this.props.table.deck);
        userWinRate = Math.floor(userWinRate*100)
        probabilityAssist = <div>
        Estimated Win Chance: {userWinRate}%
        </div>
      }
    }


    // for (let i=0; i<4; i++){
    //   if(this.props.table.Seat[i]){
    //     seat[i] = <button onClick={()=>this.props.standSeat(i)}>Stand Up</button>
    //   } else(
    //     seat[i] = <button onClick={()=>this.props.sitSeat(i,this.props.loginUser.id)}>Sit Down</button>
    //   )
    // }




    let player0Hand = '';
    let player1Hand = '';

    // let player2Hand = '';
    // let player3Hand = '';




    if(this.props.table.playerHand[0].length > 0){

      player0Hand =
      <div>
        <img src={require("../images/" + this.props.table.playerHand[0][0].point + '_of_' + this.props.table.playerHand[0][0].suit + '.png')} alt='' height="100"/>
        <img src={require("../images/" + this.props.table.playerHand[0][1].point + '_of_' + this.props.table.playerHand[0][1].suit + '.png')} alt='' height="100"/>
      </div>

    }




    if(this.props.table.playerHand[1].length > 0){
      if (this.props.table.currentStatus === 'end'){
        player1Hand =
        <div>
          <img src={require("../images/" + this.props.table.playerHand[1][0].point + '_of_' + this.props.table.playerHand[1][0].suit + '.png')} alt='' height="100"/>
          <img src={require("../images/" + this.props.table.playerHand[1][1].point + '_of_' + this.props.table.playerHand[1][1].suit + '.png')} alt='' height="100"/>
        </div>
      }else{
        player1Hand =
        <div>
          <img src={require("../images/card_back.jpg")} alt='' height="100"/>
          <img src={require("../images/card_back.jpg")} alt='' height="100"/>
        </div>
      }
    }

    let message='test'
    if (this.props.table.message.length > 0){
      message =
      <div>
        {this.props.table.message.map((content, idx)=>
          <div key={idx}>
            {content}
          </div>
        )}
      </div>
    }


    let player0ActionButton = ''
    let player0Bet=''
    let player1Bet=''
    let dealButton = ''
    let Pot = ''
    let CenterMessage = ''
    let currentStatus = this.props.table.currentStatus;

    if (this.props.table.message.length !== 0){
      CenterMessage = <div>Message: {this.props.table.message[this.props.table.message.length-1]}<br/></div>
    }

    if(this.props.table.Seat[1]===true){
      player1Bet = <div>
                    Chips: {this.props.table.chips[1]}<br/>
                    Bet: {this.props.table.raise[1]}
                   </div>
    }

    if(this.props.table.Seat[0]===true){
      player0Bet = <div>
                      Chips: {this.props.table.chips[0]}<br/>
                      Bet: {this.props.table.raise[0]}
                   </div>
    }


    if (currentStatus === 'Waiting'){
      dealButton = <button className='dealButton' onClick={()=>this.props.Deal()}>Deal</button>
    } else if (currentStatus === 'cardDealt' || currentStatus === 'riverOne' || currentStatus === 'riverTwo' || currentStatus === 'riverThree' || currentStatus === 'end'){

                Pot = <div className="Pot">
                        Pot: {this.props.table.pot}
                      </div>
                      if(currentStatus !== 'end' && this.props.table.lastRaise !== 1){
                        player0ActionButton = <div>
                                      <button onClick={()=>this.props.Stand()}>Check</button>
                                      <button onClick={()=>this.props.Raise()}>Raise</button><br/>
                                      <button onClick={()=>this.props.Fold()}>Fold</button><br/>
                                      <button onClick={()=>this.props.ChangeBet(0,-50)}>-50</button>
                                      <button onClick={()=>this.props.ChangeBet(0,-5)}>-5</button>
                                      <button onClick={()=>this.props.ChangeBet(0,-10)}>-10</button>
                                      <button onClick={()=>this.props.ChangeBet(0,5)}>+5</button>
                                      <button onClick={()=>this.props.ChangeBet(0,10)}>+10</button>
                                      <button onClick={()=>this.props.ChangeBet(0,50)}>+50</button>

                                    </div>
                      }

                      if(currentStatus !== 'end' && this.props.table.lastRaise === 1){
                        player0ActionButton = <div>
                                      <button onClick={()=>this.props.Stand()}>Match Raise</button>
                                      <button onClick={()=>this.props.Raise()}>Raise Again</button><br/>
                                      <button onClick={()=>this.props.Fold()}>Fold</button><br/>
                                      <button onClick={()=>this.props.ChangeBet(0,-50)}>-50</button>
                                      <button onClick={()=>this.props.ChangeBet(0,-5)}>-5</button>
                                      <button onClick={()=>this.props.ChangeBet(0,-10)}>-10</button>
                                      <button onClick={()=>this.props.ChangeBet(0,5)}>+5</button>
                                      <button onClick={()=>this.props.ChangeBet(0,10)}>+10</button>
                                      <button onClick={()=>this.props.ChangeBet(0,50)}>+50</button>

                                    </div>
                      }

    }

    let riverHand = '';

    if (this.props.table.riverHand[0] !== undefined){

      riverHand =
      <div className="river">
        {this.props.table.riverHand.map((hand, idx) =>
                <img key={idx} src={require("../images/" + hand.point + '_of_' + hand.suit + '.png')} alt='' height="100"/>
        )}
      </div>
    }


    return(
      <div>
        {tableName}
        <div className='table'>

        <button onClick={()=>this.props.Reset()}>Reset</button> <br/>
        <div className='player1Pot'>
        {player1Bet}
        </div>
        <div className='player1'>
        {seat[1]}
        {player1Hand}
        </div>
        {dealButton}
        {Pot}
        {CenterMessage}
        <div className='riverCards'>

          {riverHand}

        </div>
        <div className='player0Pot'>
        {player0Bet}
        </div>

        <div className='player0'>
          {probabilityAssist}
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
