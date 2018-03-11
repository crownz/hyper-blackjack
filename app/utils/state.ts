import {
  getCards,
  getRandomIndex,
  calculateScore,
  getGameStatus,
  findDealerScore,
  DEALER_THRESHOLD,
  calculateResult,
} from './game';

import {
  State,
  Actions,
  AppView,
  GameState,
  GameActions,
  GameStatus,
} from '../interfaces/game';

export const state: State = {
  appView: AppView.Home,
  game: {
    deck: getCards(),
    dealerCards: [],
    userCards: [],
    userScore: 0,
    gameStatus: GameStatus.OK,
  },
};

export const actions: Actions = {
  changeAppView: (view: AppView) => (state: State) => ({
    appView: view,
  }),
  startGame: () => (state: State, actions: Actions) => {
    actions.game.drawDelearCard();
    actions.game.drawDelearCard(true);
    actions.game.drawUserCard();
    actions.game.drawUserCard();
    actions.changeAppView(AppView.Game);
  },
  restartGame: () => (state: State, actions: Actions) => {
    actions.game.reset();
    actions.startGame();
  },
  game: {
    drawDelearCard: (isHidden: boolean = false) => (state: GameState) => {
      const cardIndex = getRandomIndex(state.deck);
      const newDeck = [...state.deck];
      newDeck.splice(cardIndex, 1);
      const newCard = state.deck[cardIndex];
      newCard.isHidden = isHidden;
      return {
        ...state,
        deck: newDeck,
        dealerCards: [...state.dealerCards, newCard],
      };
    },
    drawUserCard: () => (state: GameState) => {
      const cardIndex = getRandomIndex(state.deck);
      const newDeck = [...state.deck];
      newDeck.splice(cardIndex, 1);
      const userCards = [...state.userCards, state.deck[cardIndex]];
      return {
        ...state,
        userCards,
        deck: newDeck,
        userScore: calculateScore(userCards),
        gameStatus: getGameStatus(userCards),
      };
    },
    selectCardValue: ({ cardId, value }: { cardId: string; value: number }) => (
      state: GameState,
    ) => {
      const userCards = [...state.userCards];
      const cardToUpdate = userCards.find(card => card.id === cardId);
      cardToUpdate.value = value;
      return {
        ...state,
        userCards,
        userScore: calculateScore(userCards),
        gameStatus: getGameStatus(userCards),
      };
    },
    openDealerCards: () => (state: GameState) => {
      const dealerCards = state.dealerCards.map(card => ({
        ...card,
        isHidden: false,
      }));
      return {
        ...state,
        dealerCards,
      };
    },
    simulateDealer: () => (state: GameState, actions: GameActions) => {
      let newState = actions.openDealerCards();
      let dealerScore = findDealerScore(newState.dealerCards);
      while (dealerScore < DEALER_THRESHOLD) {
        newState = actions.drawDelearCard();
        dealerScore = findDealerScore(newState.dealerCards);
      }
      return {
        ...newState,
        gameStatus: calculateResult(state.userScore, dealerScore),
      };
    },
    reset: () => (state: GameState) => {
      return {
        deck: getCards(),
        dealerCards: [],
        userCards: [],
        userScore: 0,
        gameStatus: GameStatus.OK,
      };
    },
  },
};
