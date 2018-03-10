import { h, app } from 'hyperapp';

import { getCards, getRandomIndex, calculateScore } from './utils/game';
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
  drawUserCard: () => void;
  selectCardValue: (params: { cardId: string; value: number }) => void;
}

const appState: State = {
  gameState: GameState.NotStarted,
  cards: getCards(),
  dealerCards: [],
  user: {
    cards: [],
    score: 0,
    selectedValues: {},
  },
};

const appActions: Actions = {
  changeGameState: (value: GameState) => (state: State) => ({
    gameState: value,
  }),
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
  selectCardValue: ({ cardId, value }: { cardId: string; value: number }) => (
    state: State,
  ) => {
    const selectedValues = { ...state.user.selectedValues, [cardId]: value };
    return {
      user: {
        cards: state.user.cards,
        score: calculateScore(state.user.cards, selectedValues),
        selectedValues,
      },
    };
  },
  drawUserCard: () => (state: State) => {
    const cardIndex = getRandomIndex(state.cards);
    const newCards = [...state.cards];
    newCards.splice(cardIndex, 1);
    const newCard = state.cards[cardIndex];
    if (typeof newCard.value === 'number') {
      const cards = [...state.user.cards, newCard];
      return {
        cards: newCards,
        user: {
          score: calculateScore(cards, state.user.selectedValues),
          selectedValues: state.user.selectedValues,
          cards,
        },
      };
    } else {
      const cards = [...state.user.cards, newCard];
      const selectedValues = {
        ...state.user.selectedValues,
        [newCard.id]: newCard.value[0],
      };
      return {
        cards: newCards,
        user: {
          score: calculateScore(cards, selectedValues),
          selectedValues,
          cards,
        },
      };
    }
  },
};

const renderGame = (state: State, actions: Actions) => {
  switch (state.gameState) {
    case GameState.NotStarted:
      return <Home startGame={actions.startGame} />;
    case GameState.Started:
      return (
        <Game
          userState={state.user}
          drawUserCard={actions.drawUserCard}
          dealerCards={state.dealerCards}
          selectCardValue={(cardId, value) =>
            actions.selectCardValue({ cardId, value })
          }
        />
      );
    default:
      return <Home startGame={actions.startGame} />;
  }
};

const view = (state: State, actions: Actions) => {
  return (
    <div class={Styles.container}>
      <div class={Styles.title}>Welcome to HyperBlackjack.</div>
      {renderGame(state, actions)}
    </div>
  );
};

app(appState, appActions, view, document.body);
