import React, { ChangeEvent } from 'react';
import { Card } from "./Card";

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

