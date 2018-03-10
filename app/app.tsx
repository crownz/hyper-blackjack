import { h, app } from 'hyperapp';

import Home from './pages/home';

import * as Styles from './app.css';

enum GameState {
  NotStarted = 'NotStarted',
  Started = 'Started',
  Finished = 'Finished',
}

interface State {
  gameState: GameState;
}

interface Actions {
  changeGameState: (value: GameState) => void;
}

const appState: State = {
  gameState: GameState.NotStarted,
};

const appActions: Actions = {
  changeGameState: (value: GameState) => (state: State) => ({ gameState: value }),
};

const renderGame = (gameState: GameState, changeGameState: (value: GameState) => void) => {
  switch (gameState) {
    case GameState.NotStarted:
      return <Home startGame={() => changeGameState(GameState.Started)} />;
    case GameState.Started:
      return <div>Started!</div>;
    default:
      return <Home startGame={() => changeGameState(GameState.Started)} />;
  }
}

const view = (state: State, actions: Actions) => (
  <div class={Styles.container}>
    <div class={Styles.title}>
      Welcome to HyperBlackjack.
    </div>
    {renderGame(state.gameState, actions.changeGameState)}
  </div>
)

app(appState, appActions, view, document.body);
