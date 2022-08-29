import React from "react";

type Props = {
    card: string
}

export const Card = (props: Props) => {
    let number="";
    let cosa="";
    switch(props.card[1])
    {
        case 'A':
            number='10';
            cosa="";
            break;
        case 'B':
            number='jack';
            cosa="2";
            break;
        case 'C':
            number='queen';
            cosa="2";
            break;
        case 'D':
            number='king';
            cosa="2";
            break;
        case 'E':
            number='ace';
            break;
        default: 
            number=(parseInt(props.card[1])+1).toString()
            break;
    }
    let simg=""
    switch(props.card[0])
    {
        case 'S':
            simg="images/"+number+"_of_spades"+cosa+".png"
            break;
        case 'H':
            simg="images/"+number+"_of_hearts"+cosa+".png"
            break;
        case 'D':
            simg="images/"+number+"_of_diamonds"+cosa+".png"
            break;
        case 'C':
            simg="images/"+number+"_of_clubs"+cosa+".png"
            break;
    }
    return <img className="carta" src={simg}></img>
    
}
