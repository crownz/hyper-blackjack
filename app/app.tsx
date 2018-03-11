import { h, app } from 'hyperapp';

import { state, actions } from './utils/state';
import { State, Actions, AppView } from './interfaces/game';

import Home from './pages/home';
import Game from './pages/game';

import * as Styles from './app.css';

const renderGame = (state: State, actions: Actions) => {
  switch (state.appView) {
    case AppView.Home:
      return <Home startGame={actions.startGame} />;
    case AppView.Game:
      return (
        <Game
          gameState={state.game}
          gameActions={actions.game}
          restartGame={actions.restartGame}
        />
      );
    default:
      return <Home startGame={actions.startGame} />;
  }
};

const View = (state: State, actions: Actions) => {
  return (
    <div class={Styles.container}>
      <div class={Styles.title}>Welcome to HyperBlackjack.</div>
      {renderGame(state, actions)}
    </div>
  );
};

app(state, actions, View, document.body);
