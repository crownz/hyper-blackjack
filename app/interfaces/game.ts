export interface Card {
  id: string;
  value: number;
  title: string;
  optionalValues?: number[];
  lowestValue?: number;
  isHidden?: boolean;
}

export enum GameStatus {
  Won = 'Won',
  Lost = 'Lost',
  ValueChangeNeeded = 'ValueChangeNeeded',
  OK = 'OK',
  Draw = 'Draw',
}

export enum AppView {
  Home = 'NotStarted',
  Game = 'Started',
}

export interface GameState {
  gameStatus: GameStatus;
  deck: Card[];
  dealerCards: Card[];
  userCards: Card[];
  userScore: number;
}

export interface State {
  appView: AppView;
  game: GameState;
}

export interface UserState {
  cards: Card[];
  score: number;
  gameStatus: GameStatus;
}

export interface Actions {
  changeAppView: (view: AppView) => any;
  startGame: () => any;
  restartGame: () => any;
  game: GameActions;
}

export interface GameActions {
  drawDelearCard: (isOpen?: boolean) => any;
  drawUserCard: () => any;
  reset: () => any;
  openDealerCards: () => any;
  simulateDealer: () => any;
  selectCardValue: (params: { cardId: string; value: number }) => any;
}
