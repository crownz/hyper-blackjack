import { h, app } from 'hyperapp';

import { getCards, getRandomIndex } from './utils/game';
import Home from './pages/home';
import Game from './pages/game';

import * as Styles from './app.css';

enum GameState {
  NotStarted = 'NotStarted',
  Started = 'Started',
  Finished = 'Finished',
}

interface State {
  gameState: GameState;
  cards: Card[];
  userCards: Card[];
  dealerCards: Card[];
}

interface Actions {
  changeGameState: (value: GameState) => void;
  drawCard: () => void;
  drawDelearCard: () => void;
  startGame: () => void;
}

const appState: State = {
  gameState: GameState.NotStarted,
  cards: getCards(),
  userCards: [],
  dealerCards: [],
};

const appActions: Actions = {
  changeGameState: (value: GameState) => (state: State) => ({ gameState: value }),
  startGame: () => (state: State, actions: Actions) => {
    console.log('starting!');
    actions.drawDelearCard();
    actions.drawDelearCard();
    actions.drawCard();
    actions.drawCard();
    actions.changeGameState(GameState.Started);
    console.log('state', state);
  },
  drawCard: () => (state: State) => {
    const cardIndex = getRandomIndex(state.cards);
    const newCards = [...state.cards];
    newCards.splice(cardIndex, 1);
    return {
      cards: newCards,
      userCards: [...state.userCards, state.cards[cardIndex]],
    };
  },
  drawDelearCard: () => (state: State) => {
    const cardIndex = getRandomIndex(state.cards);
    const newCards = [...state.cards];
    newCards.splice(cardIndex, 1);
    return {
      cards: newCards,
      dealerCards: [...state.dealerCards, state.cards[cardIndex]],
    };
  },
};

const renderGame = (state: State, actions: Actions) => {
  switch (state.gameState) {
    case GameState.NotStarted:
      return <Home startGame={actions.startGame} />;
    case GameState.Started:
      return <Game drawCard={actions.drawCard} userCards={state.userCards} />;
    default:
      return <Home startGame={actions.startGame} />;
  }
}

const view = (state: State, actions: Actions) => {
  console.log('random index:', getRandomIndex(state.cards));
  return (
    <div class={Styles.container}>
      <div class={Styles.title}>
        Welcome to HyperBlackjack.
      </div>
      {renderGame(state, actions)}
    </div>
  )
}

app(appState, appActions, view, document.body);
