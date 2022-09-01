import React from "react";

type PotProps = {
    amount: number
}

export const Pot = (props: PotProps) => {
    
    return <div className="Pot">
                Pot: <img className="chip" src="images/chip.png"></img>{props.amount}
           </div>
}
