
import React from "react";
import './App.css';
import {TPlayer, Player} from './components/Player'
import {Start, Victory, Gameover} from './components/Screens'
import {Hand} from './components/Hand'
import {Deck} from './components/Deck'
import {Pot} from './components/Pot'
import {Panel} from './components/Panel'
import * as logic from './logic';
import { useEffect, useRef, useState } from "react";

const INITIAL_MONEY = 20000

function App() {

  useEffect(() => {
    document.title = 'Poker game by Juanjo';
  });

  const players=[
    new TPlayer(
      0, 
      'Juanjo', 
      INITIAL_MONEY, 
      0, 
      0, 
      false, 
      true,
      false,
      'https://miro.medium.com/fit/c/176/176/1*kQwIpdh8bFFQXS5876RV5w.jpeg'
    ),
    new TPlayer(1, 'Player 2', INITIAL_MONEY, 0, 0, false, true, false, 'https://i.pravatar.cc/75?kk=1'),
    new TPlayer(2, 'Player 3', INITIAL_MONEY, 0, 0, false, true, false, 'https://i.pravatar.cc/75?kk=2'),
    new TPlayer(3, 'Player 4', INITIAL_MONEY, 0, 0, false, true, false, 'https://i.pravatar.cc/75?kk=3'),
  ]
  return (
    <div className="App" 
       style={{backgroundImage: 'url(./images/background.jpg)'}}>
      <Board players={players}/>
    </div>
  );
}

type BoardProps = {
  players: Array<TPlayer>
}

function Board(props: BoardProps) {
  
  let [state,set_state] = useState(new logic.GameState(props.players))

  //console.log("stage: "+state.stage)
  switch(state.stage)
  {
    case 0://dealing cards      
      /*console.log("test1: "+JSON.stringify(utils.highest_card(
        ["H1","H4","H5","H7","H8"],[],["H4","H5","H8","HB","HD"],[]))
      )*/
      
      for(let i=0;i<logic.NPLAYERS;i++){
        state.players[i].bet=0
        if(!state.players[i].eliminated)
        {
          state.players[i].playing=true
          let e1: string | undefined= state.available_cards.pop()
          let e2: string | undefined = state.available_cards.pop()
          state.player_cards[i]=[e1 as string,e2 as string]
        }
      }
      state.call=logic.INITIAL_BET
      state.players[0].showCards=true

      state=logic.force_bet(state, (state.button+2)%logic.NPLAYERS, logic.INITIAL_BET)
      state=logic.force_bet(state, (state.button+3)%logic.NPLAYERS, logic.INITIAL_BET/2)
      state.speaking_player=(state.button+1)%logic.NPLAYERS
      state.players_asked=0
      break;
    case 1://listening players
      state=logic.listen_players(state)
      break;
    case 2://showing 3 cards
      state.hand_cards=[
        state.available_cards.pop() as string,
        state.available_cards.pop() as string,
        state.available_cards.pop() as string
      ]
      break;
    case 3://listening players
        state=logic.listen_players(state)
      break;
    case 4://showing 1 card
      state.hand_cards=[...state.hand_cards,
        state.available_cards.pop() as string,
      ]
      break;
    case 5://listening players
      state=logic.listen_players(state)
      break;
    case 6://showing 1 card
      state.hand_cards=[...state.hand_cards,
        state.available_cards.pop() as string,
      ]
      break;
    case 7:
      state=logic.listen_players(state)
      break;
    case 8: //show cards
      state.players[1].showCards=true
      state.players[2].showCards=true
      state.players[3].showCards=true
      //console.log("table hand: "+JSON.stringify(state.hand_cards))
      state=logic.reward_winners(state)
      break;
    case 9://rewarding winners
      state.players[1].showCards=false
      state.players[2].showCards=false
      state.players[3].showCards=false
      //state.players[0].money+=state.pot;
      state.players[0].bet=0;
      state.players[1].bet=0;
      state.players[2].bet=0;
      state.players[3].bet=0;
      state.players[0].won=0;
      state.players[1].won=0;
      state.players[2].won=0;
      state.players[3].won=0;
      
      state.players[1].best_hand=[]
      state.players[2].best_hand=[]
      state.players[3].best_hand=[]
      let neliminated=0
      for(let i=0;i<logic.NPLAYERS;i++)
      {
        if(state.players[i].money<0)
        {
          state.players[i].eliminated=true
          neliminated++
          if(i==0){
            state=logic.game_over(state)
          }
        }
        if(neliminated==logic.NPLAYERS-1){
          state=logic.victory(state)
        }
        if(!state.players[i].eliminated){
        }
      }

      state.total_pot=0
      
      state.call=logic.INITIAL_BET;
      state.button=(state.button+1)%logic.NPLAYERS
      state.available_cards=logic.shuffle_cards()
      state.hand_cards=[]
      state.players[0].showCards=false
      break;
  }

  
  useEffect(()=>{
    let l=400
    if(state.stage==8)
      l=7000
    let mytimeout=setTimeout(() => 
    {
      if(state.bListening)
      {
        if(state.speaking_player!=0)
        {
          state = logic.next_player_speaks(state)
          set_state({...state})
        }
      }
      else if(state.stage<logic.NSTATES)
      {
        state.players_asked=0
        state.stage = (state.stage+1)%logic.NSTATES
        set_state({...state})
      }
      //console.log("useEffect "+state.stage)

    },l)},[props,state]
  )

  function startClick()
  {
    const audio = new Audio("./sounds/117482-Casino_ambience_at_game_tables_1.mp3")
    audio.loop=true
    audio.volume=0.1
    audio.play()
    state.screen="playing"
    set_state({...state}) //set_state(pr => ({...state}))
  }

  //set_player_cards(player_cards)//??
  const dealer=<img className='dealer' src='./images/dealer1.jpg'></img>
  return (
    <div  className="Board">
        <img className='table' src='./images/table.png'></img>
        <Start show={state.screen=="start"} handleClick={startClick}/>
        <Victory show={state.screen=="victory"}/>
        <Gameover show={state.screen=="gameover"}/>
        <Hand cards={state.hand_cards}/>
        <Deck/>
        <Pot amount={state.total_pot}/>
        <Player key="0" eliminated={state.players[0].eliminated} won={state.players[0].won} hasButton={state.button==0} type="human"  player={props.players[0]} cards={state.player_cards[0]}/>
        <Player key="1" eliminated={state.players[1].eliminated} won={state.players[1].won} hasButton={state.button==1} type="computer" player={props.players[1]} cards={state.player_cards[1]}/>
        <Player key="2" eliminated={state.players[2].eliminated} won={state.players[2].won} hasButton={state.button==2} type="computer" player={props.players[2]} cards={state.player_cards[2]}/>
        <Player key="3" eliminated={state.players[3].eliminated} won={state.players[3].won} hasButton={state.button==3} type="computer" player={props.players[3]} cards={state.player_cards[3]}/>
        <Panel 
          visible={state.speaking_player==0 && state.bListening}
          state={state}
          fold={logic.fold}
          check={logic.check}
          raise={logic.raise}
          set_state={set_state}
          next_player_speaks={logic.next_player_speaks}
        />
        {dealer}
    </div>
  );
}

export default App;
