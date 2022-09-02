import React from "react";
import { GameState } from "../logic";
import { useState, useEffect, useRef } from "react";

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
        set_raised(+e.target.value)
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
