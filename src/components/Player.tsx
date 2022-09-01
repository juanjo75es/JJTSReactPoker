import React, { ChangeEvent } from 'react';
import { useState, useEffect, useRef } from "react";
import { Card } from "./Card";
import { GameState } from "../logic";

export class TPlayer {
    id: number
    name: string
    money: number
    bet: number
    won: number
    showCards: boolean 
    playing: boolean
    eliminated: boolean
    picture: string
    best_hand: Array<string>

    constructor(id: number, name: string,
        money: number,
        bet: number,
        won: number,
        showCards: boolean ,
        playing: boolean,
        eliminated: boolean,
        picture: string){
            this.id=id
            this.name=name
            this.money=money
            this.bet=bet
            this.won=won
            this.showCards=showCards
            this.playing=playing
            this.eliminated=eliminated
            this.picture=picture
            this.best_hand=[]
    }
}

type PanelProps = {
    visible: boolean,
    state: GameState,
    set_state(st:GameState): void,
    next_player_speaks(st: GameState): GameState,
    fold(st: GameState): GameState,
    check(st:GameState): GameState,
    raise(st:GameState, am: number): GameState
}

export const Panel = (props: PanelProps) => {
    const audio = new Audio("./sounds/158166-Door-Wood-Bathroom-Exterior_POV-Knock-x2-Concise.mp3")
    const audio2 = new Audio("./sounds/201805__fartheststar__poker-chips3.wav")
    const audio3 = new Audio("./sounds/201807__fartheststar__poker-chips1.wav")
    const audio4 = new Audio("./sounds/289113-Dropping_on_the_table_a_pile_of_small_cards_03.mp3")
    
    let raised:number
    let set_raised:any
    [raised,set_raised]=useState(100)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        set_raised(e.target.value)
      };

    if(props.visible)
    {
        return <div className="Panel">
                <div>
                <a className="myButton" onClick={() => {
                        let st=props.fold(props.state)
                        st=props.next_player_speaks(st)
                        set_raised(100)
                        props.set_state({...st}) //set_state(pr => ({...state}))
                        audio4.play()
                    }}>Fold</a>
                </div>
                <div>
                <a className="myButton" onClick={() => {
                    if(props.state.call-props.state.players[0].bet==0)
                        audio.play()
                    else
                        audio2.play()
                    let st=props.check(props.state)
                        st=props.next_player_speaks(st)
                        set_raised(100)
                        props.set_state({...st})
                    }}>Check {props.state.call-props.state.players[0].bet}</a>
                </div>
                <div>
                <a className="myButton" onClick={() => {
                        let st=props.raise(props.state,raised)
                        st=props.next_player_speaks(st)
                        set_raised(100)
                        props.set_state({...st})
                        audio3.play()
                    }}>Raise {raised}</a>
                </div>
                <div>
                    <input type="range" onChange={handleChange} min="100" max={props.state.players[0].money}></input>
                </div>
           </div>
    }
    return <></>
}

type PlayerProps = {
    type: string,
    player: TPlayer,
    eliminated: boolean,
    cards: Array<string>,
    hasButton: boolean,
    won: number
}

export const Player = (props: PlayerProps) => {
    let listCards: any=<></>
    let classname="jugador jugador"+(props.player.id+1)
    if(props.eliminated)
        classname="eliminated_player jugador jugador"+(props.player.id+1)
    if(!props.eliminated)
    {
        if(props.player.playing)
        {
            if(props.player.showCards)
            {
                listCards=props.cards.map( card => {
                    return <Card key={card} card={card} />
                })    
            }
        else if(props.cards && props.cards.length>0)
            {
                listCards= <>
                    <img className="reverso" src="images/back.png"></img>
                    <img className="reverso" src="images/back.png"></img>
                    </>
            }
        }
        else{
            listCards=<></>
        }
    }

    let sbutton=<></>
    if(props.hasButton){
        sbutton=<img className="dealer-button" src="./images/dealer-button.png"></img>
    }

    let swinner=<></>
    let slistCards2 = <></>
    if(props.won>0){
        const listCards2=
        props.player.best_hand.map( (card: string) =>{        
            return <Card key={card} card={card}/>
        })
        slistCards2=<div className="winning-hand">
            {listCards2}
        </div>
        swinner=       
            <div className="winner">${props.won} 
            </div>
    }
    let sbet=<></>
    if(props.player.bet>0){
        sbet=<div className="bet"><img className="chip" src="images/chip.png"></img> {props.player.bet}</div>
    }

    return <div className={classname}>
                <div className="cartas">
                    {listCards}
                </div>
                <div className="card">
                    <div className="card_img">
                        <img className="css-border" src={props.player.picture} />
                    </div>
                    <div className="card_info">
                        <div>{props.player.name}</div>
                        <div>{props.player.money} </div>
                        {swinner}
                    </div>
                </div>
                    {slistCards2}
                    {sbet}
                    {sbutton}
                    
           </div>
}

