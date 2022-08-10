import './App.css';
import * as React from 'react';
import {Route, Routes} from 'react-router-dom';
import Starter from './components/starter-page';
import PlayGame from './components/game-page';

function App() {
  const [theme, setTheme] = React.useState(localStorage.getItem('theme') || 'number');
  const [player, setPlayer] = React.useState(localStorage.getItem('player') || '1');
  const [grid, setGrid] = React.useState(localStorage.getItem('grid') || '4');
  // add local storage to remember the most recent states (refreshing the game-page shouldn't bring the page setting to *inital* states)
  React.useEffect(() => {
    localStorage.setItem('theme', theme);
    localStorage.setItem('player', player);
    localStorage.setItem('grid', grid);
  }, [theme, player, grid]);

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
    // console.log(e.target.value);
  }
  const handlePlayerChange = (e) => {
    setPlayer(e.target.value);
    // console.log(e.target.value);
  }
  const handleGridChange = (e) => {
    setGrid(e.target.value);
    // console.log(e.target.value);
  }
  // const handleStartGame = () => {
  //   console.log(theme, player, grid);
  // }

  const handleNewGame = () => {
    setTheme('number');
    setPlayer('1');
    setGrid('4');
  }

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Starter themeChangeHandler={handleThemeChange}
                                          playerChangeHandler={handlePlayerChange}
                                          gridChangeHandler={handleGridChange}
                                          theme={theme}
                                          player={player}
                                          grid={grid} />} />
        <Route path='game' element={<PlayGame theme={theme}
                                              player={player}
                                              grid={grid}
                                              newGameHandler={handleNewGame} />} />
      </Routes>
    </div>
  );
}

export default App;
