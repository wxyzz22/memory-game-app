import * as React from 'react';
import StatusBar from './status-bar';
import { Link } from 'react-router-dom';

export default function ResModal({show, restartHandler, newGameHandler, numPlayer, value}) {
    // value should be points = [player1-point, player2-points, ...]; else, should be {time:{min, sec}, moves}

    const showHideModal = show ? "modal" : "modal display-none";
    const results = [];
    let title = '';
    let subtitle = '';

    if (show) {
        if (numPlayer === '1') {
            title = 'You did it!';
            subtitle = "Game over! Here's how you got on...";
            results.push({name: 'Time Elapsed', display: `${value.time.min < 10 ? '0'+value.time.min : value.time.min}: ${value.time.sec < 10 ? '0' + value.time.sec : value.time.sec}`});
            results.push({name: 'Moves Taken', display: value.moves});
        } else {
            let points = [];
            for (let i = 1; i <= value.length; i++) {
                points.push({player: i, point:value[i-1], isWinner: false});
            }
            points.sort((a, b) => b.point - a.point);
            let i = -1;
            while (i+1 < points.length && points[0].point === points[i+1].point) {
                i = i + 1;
                points[i].isWinner = true;
            }
            if (i > 0) {
                title = "It's a tie!";
            } else {
                title = `Player ${points[0].player} Wins!`;
            }
            subtitle = "Game over! Here are the results...";
            for (let i = 0; i < points.length; i++) {
                results.push({name: `Player ${points[i].player} ${points[i].isWinner ? '(Winner!)': ''}`, display: `${points[i].point} Pair${points[i].point > 1 ? 's': ''}`});
            }
        }
    }

    return (
        <div className={showHideModal}>
            <div className='modal-wrapper'>
                <div className='font-48 text-darkblue'>{title}</div>
                <div className='font-18 text-medblue modal-subtitle'>{subtitle}</div>
                <div className='modal-status-wrapper'>
                  {results.map((item, index) => <StatusBar key={index} name={item.name} value={item.display} type={numPlayer === '1' ? 'single' : 'multi'} isModal={true} />)}
                </div>
                <div className='game-title-button font-20'>
                    <button className='bg-orange right-margin text-white' onClick={restartHandler}>Restart</button>
                    <button className='bg-lighterblue left-margin text-darkblue' onClick={newGameHandler}><Link to='/'>Setup New Game</Link></button>
                </div>
            </div>
        </div>
    );
};