declare module '*.css' {
  const content: any;
  export = content;
}

interface Card {
  id: string;
  value: number;
  title: string;
  optionalValues?: number[];
  lowestValue?: number;
  isOpen?: boolean;
}

enum GameStatus {
  Won = 'Won',
  Lost = 'Lost',
  ValueChangeNeeded = 'ValueChangeNeeded',
  OK = 'OK',
}

interface UserState {
  cards: Card[];
  score: number;
  gameStatus: GameStatus;
}
