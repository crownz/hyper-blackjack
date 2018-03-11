import { h } from 'hyperapp';

import Card from './card';
import ValueSelect from './value-select';

import * as Styles from './game.css';

interface Props {
  userState: UserState;
  drawUserCard: () => void;
  dealerCards: Card[];
  selectCardValue: (cardId: string, value: number) => void;
}

const renderCards = (
  cards: Card[],
  selectCardValue: (cardId: string, value: number) => void,
) => {
  return cards.map(card => (
    <div class={Styles.cardContainer} key={card.id}>
      <Card title={card.title}>
        {card.optionalValues ? (
          <ValueSelect
            id={card.id}
            values={card.optionalValues}
            onSelect={selectCardValue}
          />
        ) : null}
      </Card>
    </div>
  ));
};

const Game = ({
  userState,
  drawUserCard,
  dealerCards,
  selectCardValue,
}: Props) => (
  <div class={Styles.container}>
    <div class={Styles.cardsContainer}>
      {renderCards(dealerCards, selectCardValue)}
    </div>
    <div class={Styles.cardsContainer}>
      {renderCards(userState.cards, selectCardValue)}
    </div>
    <div class={Styles.score}>{userState.score}</div>
    <div class={Styles.actions}>
      <button onclick={drawUserCard}>DRAW</button>
    </div>
  </div>
);

export default Game;
