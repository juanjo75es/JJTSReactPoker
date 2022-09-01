import React from "react";

type StartProps = {
    show: boolean,
    handleClick(): void
}

export const Start = (props: StartProps) => {
    if(props.show)
    return <div className="overlayDiv"
        style={{backgroundImage: 'url(./images/background.jpg)'}}
    >
        <div className="centered">
            <div>Press to start</div>
            <div>
                <a className="myButton" onClick={props.handleClick}>Start</a>
            </div>
        </div>
    </div>
    return <></>
}

type VictoryProps = {
    show: boolean
}

export const Victory = (props: VictoryProps) => {
    if(props.show)
    return <div className="overlayDiv">
        <div className="centered">
            <div>You won</div>
        </div>
    </div>
    return <></>
}

type GameoverProps = {
    show: boolean
}

export const Gameover = (props: GameoverProps) => {
    if(props.show)
    return <div className="overlayDiv">
        <div className="centered">
            <div>Eliminated</div>
        </div>
    </div>
    return <></>
}
