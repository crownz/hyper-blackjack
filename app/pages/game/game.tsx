import { h } from 'hyperapp';

import {
  GameState,
  GameActions,
  GameStatus,
  Card,
} from '../../interfaces/game';

import CardComponent from './card';
import ValueSelect from './value-select';
import GameStatusOverlay from './game-status-overlay';

import * as Styles from './game.css';

interface Props {
  restartGame: () => void;
  gameState: GameState;
  gameActions: GameActions;
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

const selectCardValue = (selectAction: Function) => {
  return (cardId: string, value: number) => selectAction({ cardId, value });
};

const Game = ({ restartGame, gameState, gameActions }: Props) => {
  console.log('game state:', gameState);
  return (
    <div class={Styles.container}>
      <div class={Styles.cardsContainer}>
        {renderCards(
          gameState.dealerCards,
          selectCardValue(gameActions.selectCardValue),
        )}
      </div>
      <div class={Styles.cardsContainer}>
        {renderCards(
          gameState.userCards,
          selectCardValue(gameActions.selectCardValue),
        )}
      </div>
      <div class={Styles.score}>{gameState.userScore}</div>
      <div class={Styles.actions}>
        <button
          onclick={gameActions.drawUserCard}
          disabled={gameState.gameStatus === GameStatus.ValueChangeNeeded}
        >
          DRAW
        </button>
        <button
          onclick={gameActions.simulateDealer}
          disabled={gameState.gameStatus === GameStatus.ValueChangeNeeded}
        >
          STAND
        </button>
      </div>
      <GameStatusOverlay
        status={gameState.gameStatus}
        restartGame={restartGame}
      />
    </div>
  );
};

export default Game;
