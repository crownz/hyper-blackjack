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
