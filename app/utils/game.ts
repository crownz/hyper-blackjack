const unqiueCards: { value: number | number[]; title: string }[] = [
  {
    value: 2,
    title: '2',
  },
  {
    value: 3,
    title: '3',
  },
  {
    value: 4,
    title: '4',
  },
  {
    value: 5,
    title: '5',
  },
  {
    value: 6,
    title: '6',
  },
  {
    value: 7,
    title: '7',
  },
  {
    value: 8,
    title: '8',
  },
  {
    value: 9,
    title: '9',
  },
  {
    value: 10,
    title: '10',
  },
  {
    value: 10,
    title: 'J',
  },
  {
    value: 10,
    title: 'Q',
  },
  {
    value: 10,
    title: 'K',
  },
  {
    value: [1, 11],
    title: 'A',
  },
];

export const getCards = (): Card[] => {
  return [...unqiueCards, ...unqiueCards, ...unqiueCards, ...unqiueCards].map(
    (card, idx) => {
      const value = typeof card.value === 'number' ? card.value : card.value[0];
      return {
        ...card,
        id: `${idx}-${value}`,
      };
    },
  );
};

export const getRandomIndex = (cards: Card[]) => {
  return Math.floor(Math.random() * cards.length);
};

export const calculateScore = (cards: Card[], selectValues: SelectedValues) => {
  return cards.reduce((last, current) => {
    if (typeof current.value === 'number') {
      return last + current.value;
    }
    return last + selectValues[current.id];
  }, 0);
};
