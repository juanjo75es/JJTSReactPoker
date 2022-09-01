import React from "react";
import { Card } from "./Card";

type HandProps = {
    cards: Array<string>
}

export const Hand = (props: HandProps) => {
    
    const listCards=props.cards.map( card =>{        
        return <Card key={card} card={card}/>
    }

    );
    return <div className="Hand">
                {listCards}
           </div>
}
