import * as React from 'react';
import {Link} from 'react-router-dom';

export default function Starter({themeChangeHandler, 
                                 playerChangeHandler, 
                                 gridChangeHandler, 
                                 theme,
                                 player,
                                 grid}) {
    // styling radio to look like button: https://stackoverflow.com/questions/16242980/making-radio-buttons-look-like-buttons-instead
    return (
        <div className='starter-page'>
            <div className='starter-wrapper'>
                <div className='font-40 text-white starter-title'>memory</div>
                <div className='starter-box'>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className='topic-container'>
                            <div className='font-20 text-lightblue'>Select Theme</div>
                            <ul className='button-radio med-button'>
                                <li>
                                    <input type='radio' id='number-coin' value='number' name='theme' checked={theme === 'number'} onChange={themeChangeHandler} />
                                    <label htmlFor='number-coin' className='font-26 text-white'>Numbers</label>
                                </li>
                                <li>
                                    <input type='radio' id='icon-coin' value='icon' name='theme' checked={theme === 'icon'} onChange={themeChangeHandler} />
                                    <label htmlFor='icon-coin' className='font-26 text-white'>Icons</label>
                                </li>
                            </ul>
                        </div>
                        <div className='topic-container'>
                            <div className='font-20 text-lightblue'>Number of Players</div>
                            <ul className='button-radio small-button'>
                                <li>
                                    <input type='radio' id='1-player' value='1' name='player' checked={player === '1'} onChange={playerChangeHandler} />
                                    <label htmlFor='1-player' className='font-26 text-white'>1</label>
                                </li>
                                <li>
                                    <input type='radio' id='2-player' value='2' name='player' checked={player === '2'} onChange={playerChangeHandler} />
                                    <label htmlFor='2-player' className='font-26 text-white'>2</label>
                                </li>
                                <li>
                                    <input type='radio' id='3-player' value='3' name='player' checked={player === '3'} onChange={playerChangeHandler} />
                                    <label htmlFor='3-player' className='font-26 text-white'>3</label>
                                </li>
                                <li>
                                    <input type='radio' id='4-player' value='4' name='player' checked={player === '4'} onChange={playerChangeHandler} />
                                    <label htmlFor='4-player' className='font-26 text-white'>4</label>
                                </li>
                            </ul>
                        </div>
                        <div className='topic-container'>
                            <div className='font-20 text-lightblue'>Grid Size</div>
                            <ul className='button-radio med-button'>
                                <li>
                                    <input type='radio' id='small-grid' value='4' name='grid' checked={grid === '4'} onChange={gridChangeHandler} />
                                    <label htmlFor='small-grid' className='font-26 text-white'>4x4</label>
                                </li>
                                <li>
                                    <input type='radio' id='large-grid' value='6' name='grid' checked={grid === '6'} onChange={gridChangeHandler} />
                                    <label htmlFor='large-grid' className='font-26 text-white'>6x6</label>
                                </li>
                            </ul>
                        </div>
                        <button className='large-button text-white'>
                            <Link to='/game' className='font-32'>Start Game</Link>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}