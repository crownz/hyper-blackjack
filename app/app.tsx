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
  deck: Card[];
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
  deck: getCards(),
  dealerCards: [],
  user: {
    cards: [],
    score: 0,
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
    const cardIndex = getRandomIndex(state.deck);
    const newDeck = [...state.deck];
    newDeck.splice(cardIndex, 1);
    return {
      deck: newDeck,
      dealerCards: [...state.dealerCards, state.deck[cardIndex]],
    };
  },
  selectCardValue: ({ cardId, value }: { cardId: string; value: number }) => (
    state: State,
  ) => {
    const newUserCards = [...state.user.cards];
    const cardToUpdate = newUserCards.find(card => card.id === cardId);
    cardToUpdate.value = value;
    return {
      user: {
        cards: newUserCards,
        score: calculateScore(newUserCards),
      },
    };
  },
  drawUserCard: () => (state: State) => {
    const cardIndex = getRandomIndex(state.deck);
    const newDeck = [...state.deck];
    newDeck.splice(cardIndex, 1);
    const cards = [...state.user.cards, state.deck[cardIndex]];
    return {
      deck: newDeck,
      user: {
        cards,
        score: calculateScore(cards),
      },
    };
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
