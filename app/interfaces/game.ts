export enum GameStatus {
  Won = 'Won',
  Lost = 'Lost',
  ValueChangeNeeded = 'ValueChangeNeeded',
  OK = 'OK',
  Draw = 'Draw',
}

export interface UserState {
  cards: Card[];
  score: number;
  gameStatus: GameStatus;
}
