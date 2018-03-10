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
  dealerCards: Card[];
  user: UserState;
}

interface Actions {
  changeGameState: (value: GameState) => void;
  drawDelearCard: () => void;
  startGame: () => void;
  drawUserCard: () => void
  selectCardValue: (cardId: string, value: number) => void;
}

const appState: State = {
  gameState: GameState.NotStarted,
  cards: getCards(),
  dealerCards: [],
  user: {
    cards: [],
    score: 0,
    selectedValues: {},
  }
};

const appActions: Actions = {
  changeGameState: (value: GameState) => (state: State) => ({ gameState: value }),
  startGame: () => (state: State, actions: Actions) => {
    actions.drawDelearCard();
    actions.drawDelearCard();
    actions.drawUserCard();
    actions.drawUserCard();
    actions.changeGameState(GameState.Started);
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
  selectCardValue: (cardId: string, value: number) => (state: State) => {
    return {
      user: {
        selectedValues: { ...state.user.selectedValues, [cardId]: value },
      }
    };
  },
  drawUserCard: () => (state: State) => {
    const cardIndex = getRandomIndex(state.cards);
    const newCards = [...state.cards];
    newCards.splice(cardIndex, 1);
    const newCard = state.cards[cardIndex];
    if (typeof newCard.value === 'number') {
      return {
        cards: newCards,
        user: {
          cards: [...state.user.cards, newCard],
          score: state.user.score + newCard.value,
          selectedValues: state.user.selectedValues,
        }
      };
    } else {
      return {
        cards: newCards,
        user: {
          cards: [...state.user.cards, newCard],
          score: state.user.score + newCard.value[0],
          selectedValues: { ...state.user.selectedValues, [newCard.id]: newCard.value[0] },
        }
      };
    }
  }
};

const renderGame = (state: State, actions: Actions) => {
  switch (state.gameState) {
    case GameState.NotStarted:
      return <Home startGame={actions.startGame} />;
    case GameState.Started:
      return <Game userState={state.user} drawUserCard={actions.drawUserCard} dealerCards={state.dealerCards} />;
    default:
      return <Home startGame={actions.startGame} />;
  }
}

const view = (state: State, actions: Actions) => {
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
