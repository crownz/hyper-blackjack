import { GameStatus } from '../interfaces/game';

const unqiueCards: Card[] = [
  {
    value: 2,
    title: '2',
    id: undefined,
  },
  {
    value: 3,
    title: '3',
    id: undefined,
  },
  {
    value: 4,
    title: '4',
    id: undefined,
  },
  {
    value: 5,
    title: '5',
    id: undefined,
  },
  {
    value: 6,
    title: '6',
    id: undefined,
  },
  {
    value: 7,
    title: '7',
    id: undefined,
  },
  {
    value: 8,
    title: '8',
    id: undefined,
  },
  {
    value: 9,
    title: '9',
    id: undefined,
  },
  {
    value: 10,
    title: '10',
    id: undefined,
  },
  {
    value: 10,
    title: 'J',
    id: undefined,
  },
  {
    value: 10,
    title: 'Q',
    id: undefined,
  },
  {
    value: 10,
    title: 'K',
    id: undefined,
  },
  {
    value: 1,
    lowestValue: 1,
    id: undefined,
    optionalValues: [1, 11],
    title: 'A',
  },
];

const MAXIMUM_SCORE = 21;
export const DEALER_THRESHOLD = 17;

export const getCards = (): Card[] => {
  return [...unqiueCards, ...unqiueCards, ...unqiueCards, ...unqiueCards].map(
    (card, idx) => {
      return {
        ...card,
        id: `${idx}-${card.value}`,
      };
    },
  );
};

export const getRandomIndex = (cards: Card[]) => {
  return Math.floor(Math.random() * cards.length);
};

export const calculateScore = (cards: Card[]) => {
  return cards.reduce((last, current) => last + current.value, 0);
};

const findMinimumScore = (cards: Card[]) => {
  return cards.reduce((last, current) => {
    const minimumValue = current.lowestValue || current.value;
    return last + minimumValue;
  }, 0);
};

const findMaximumScore = (cards: Card[]) => {
  return cards.reduce((last, current) => {
    if (current.optionalValues) {
      return last + Math.max(...current.optionalValues);
    }
    return last + current.value;
  }, 0);
};

export const findDealerScore = (cards: Card[]) => {
  const maxScore = findMaximumScore(cards);
  if (maxScore >= DEALER_THRESHOLD && maxScore <= MAXIMUM_SCORE) {
    return maxScore;
  }
  return findMinimumScore(cards);
};

export const getGameStatus = (cards: Card[]): GameStatus => {
  if (calculateScore(cards) <= MAXIMUM_SCORE) {
    return GameStatus.OK;
  }
  if (findMinimumScore(cards) <= MAXIMUM_SCORE) {
    return GameStatus.ValueChangeNeeded;
  }
  return GameStatus.Lost;
};

export const calculateResult = (userScore: number, dealerScore: number) => {
  if (dealerScore > MAXIMUM_SCORE) {
    return GameStatus.Won;
  }
  if (dealerScore === userScore) {
    return GameStatus.Draw;
  }
  return userScore > dealerScore ? GameStatus.Won : GameStatus.Lost;
};
