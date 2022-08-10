import * as React from 'react';


export default function Coin({theme, item, clickHandler, disabled, active}) {
    // const [flipped, setFlipped] = React.useState(false);

    // const handleClick = () => {
    //     if (flipped) {
    //         setFlipped(false);
    //     } else {
    //         setFlipped(true);
    //     }
    // };
    // let indices = [];
    // for (let i = 0; i < currCoin.length; i++) {
    //     indices.push(currCoin[i].index === index);
    // }
    // const active = indices.filter((bool) => bool).length;

    return (
        <div className="coin-space">
            <div className={`coin-object 
                             ${theme === 'icon' ? 'icon-shift' : ''} 
                             ${item.isFlipped ? 'is-flipped' : ''}`} onClick={clickHandler} disabled={disabled}>
                <div className="coin-face coin-face-front"></div>
                <div className={`coin-face coin-face-back ${active ? 'active-button' : ''}`}>{item.display}</div>
            </div>
        </div>  
    );
};