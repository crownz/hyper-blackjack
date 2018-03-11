import { h } from 'hyperapp';

import CardComponent from './card';
import ValueSelect from './value-select';
import GameStatusOverlay from './game-status-overlay';

import * as Styles from './game.css';
import { GameStatus, UserState } from '../../interfaces/game';

interface Props {
  userState: UserState;
  drawUserCard: () => void;
  simulateDealer: () => void;
  dealerCards: Card[];
  selectCardValue: (cardId: string, value: number) => void;
  restartGame: () => void;
}

const renderCards = (
  cards: Card[],
  selectCardValue: (cardId: string, value: number) => void,
) => {
  return cards.map(card => (
    <div class={Styles.cardContainer} key={card.id}>
      <CardComponent title={card.title} isHidden={card.isHidden}>
        {card.optionalValues ? (
          <ValueSelect
            id={card.id}
            values={card.optionalValues}
            onSelect={selectCardValue}
          />
        ) : null}
      </CardComponent>
    </div>
  ));
};

const Game = ({
  userState,
  drawUserCard,
  simulateDealer,
  dealerCards,
  selectCardValue,
  restartGame,
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
      <button
        onclick={drawUserCard}
        disabled={userState.gameStatus === GameStatus.ValueChangeNeeded}
      >
        DRAW
      </button>
      <button
        onclick={simulateDealer}
        disabled={userState.gameStatus === GameStatus.ValueChangeNeeded}
      >
        STAND
      </button>
    </div>
    <GameStatusOverlay
      status={userState.gameStatus}
      restartGame={restartGame}
    />
  </div>
);

export default Game;
