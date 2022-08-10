import * as React from 'react';
import { Link } from 'react-router-dom';
import Coin from './coin';
import StatusBar from './status-bar';
import faIcons from './fa-icons';
import ResModal from './result-modal';


const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
};


const initCoin = (theme, num) => {
    // still need to take care of the display of faIcons on the theme="Icons" mode. (08/08/2022)
    let randomInt = [];
    for (let i = 1; i <= Object.keys(faIcons).length; i++) {
        randomInt.push(i);
    }
    shuffleArray(randomInt);
    let arr = []
    for (let i = 1; i <= (num ** 2 / 2); i++) {
        const displayVal = theme === 'number' ? randomInt[i] : faIcons[i];
        arr.push({num: randomInt[i], display: displayVal, isFlipped:false});
        arr.push({num: randomInt[i], display: displayVal, isFlipped:false});
    }
    shuffleArray(arr);
    return arr;
}

// console.log(initCoin('number', 4));

const initPoints = (num) => {
    let arr = [];
    for (let i = 0; i < num; i++) {
        arr.push(0);
    }
    return arr;
}


export default function PlayGame({theme, player, grid, newGameHandler}) {

    const [gridArr, setGridArr] = React.useState(initCoin(theme, parseInt(grid)));

    const [moves, setMoves] = React.useState(0);
    const [points, setPoints] = React.useState(initPoints(parseInt(player)));
    const [currPlayer, setCurrPlayer] = React.useState(0);

    const [currCoin, setCurrCoin] = React.useState([]);

    const [isClickable, setIsClickable] = React.useState(true);
    
    const [opened, setOpened] = React.useState(0);
    const [showModal, setShowModal] = React.useState(false);

    const [min, setMin] = React.useState(0);
    const [sec, setSec] = React.useState(0);
    const [pauseTime, setPauseTime] = React.useState(false);

    React.useEffect(() => {
        let secInterval;
        if (!pauseTime) {
            if (sec > 59) {
                setSec(0);
                setMin(min => min + 1);
            }
            if (min > 59) {
                setMin(0);
            }
            secInterval = setInterval(() => {
                setSec(sec => sec + 1);
            }, 1000);
        }
        return () => clearInterval(secInterval);
    }, [min, sec, pauseTime]);

    const playerArr = React.useMemo(() => {
        if (player === '1') return [{key:-1, name:'Time'},
                                    {key:-2, name:'Moves'}];
        let arr = [];
        for (let i = 1; i <= parseInt(player); i++) {
            arr.push({key:i, name:`Player ${i}`});
        };
        // console.log(arr);
        return arr;
    }, [player]);

    const handleRestart = () => {
        // flip all the coins to its back (and shuffle the places for the coins? Sure)
        // README: Clicking "Restart" will restart the game with the current settings
        setGridArr(initCoin(theme, parseInt(grid)));
        setMoves(0);
        setPoints(initPoints(parseInt(player)));
        setCurrPlayer(0);
        setCurrCoin([]);
        setIsClickable(true);
        setMin(0);
        setSec(0);
        setShowModal(false);
    };

    const handleClickCoin = (item, index) => {
        // if one is clicking an opened coin, do nothing

        if (currCoin.length < 2) {
            const newGridArr = gridArr.map((item, id) => {
                if (id === index) {
                    return {...item, isFlipped:!item.isFlipped};
                }
                return item;
            });
            setGridArr(newGridArr);
        }
        setCurrCoin(currCoin => [...currCoin, {index: index, display: item.num}]);
        
        if (currCoin.length >= 1 && parseInt(currCoin[0].display) !== item.num) {
            setIsClickable(false);
            setTimeout(() => {
                setIsClickable(true);
                const newGridArr = gridArr.map((coin) => {
                    switch (coin.num) {
                        case parseInt(currCoin[0].display):
                        case item.num:
                            return {...coin, isFlipped:false};
                        default:
                            return coin;
                    }
                });
                setGridArr(newGridArr);
                setCurrCoin([]);
                setMoves(moves => moves + 1);
                setCurrPlayer(currPlayer => (currPlayer + 1) % player);
                // console.log(currPlayer);
            }, 1200);
        }

        if (currCoin.length >= 1 && parseInt(currCoin[0].display) === item.num) {
            setIsClickable(false);
            setTimeout(() => {
                setIsClickable(true);
                setCurrCoin([]);
                setCurrPlayer(currPlayer => (currPlayer + 1) % player);
                setMoves(moves => moves + 1);
                const newPoints = points.map((pt, id) => id === currPlayer ? pt + 1 : pt);
                setPoints(newPoints);
                setOpened(opened => opened + 2);
                if (grid ** 2 - opened <= 2) {
                    setPauseTime(true);
                    setShowModal(true);
            }
            }, 1200);
        }
        // console.log(currCoin);
    }


    return (
        <div className='game-page'>
            <div className='game-wrapper'>
                <div className='game-title'>
                    <div className='font-26 text-darkblue'>memory</div>
                    <div className='game-title-button font-20'>
                        <button className='bg-orange right-margin' onClick={handleRestart}>Restart</button>
                        <button className='bg-lighterblue left-margin' onClick={newGameHandler}><Link to='/'>New Game</Link></button>
                    </div>
                </div>
                <div className='grid-wrapper'>
                    <div className={`grid-${grid}x${grid} text-white`}>
                        {gridArr.map((item, index) => 
                        <Coin theme={theme} key={index} item={item} clickHandler={() => isClickable ? handleClickCoin(item, index) : {}} disabled={item.isFlipped} active={currCoin.filter((item) => item.index === index).length} />)}
                    </div>
                </div>
                <div className='status-wrapper'>
                    {playerArr.map((item, index) => {
                        if (item.key < 0) {
                            return <StatusBar name={item.name} value={item.name === 'Time' ? {min:min, sec:sec} : moves} type='single' key={item.key} isModal={false} />
                        } else {
                            return <StatusBar name={item.name} value={points[index]} type='multi' key={item.key} active={currPlayer === index ? true : false} isModal={false} />
                        }
                    })}
                </div>
                <ResModal show={showModal} 
                        restartHandler={handleRestart} 
                        newGameHandler={newGameHandler} 
                        numPlayer={player} 
                        value={showModal && player === '1' ? {time: {min: min, sec:sec}, moves:moves} : points} />
            </div>
        </div>
    )
}