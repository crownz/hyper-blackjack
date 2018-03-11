import { h } from 'hyperapp';

import {
  GameState,
  GameActions,
  GameStatus,
  Card,
} from '../../interfaces/game';
import Button from '../../components/button';
import { MAXIMUM_SCORE } from '../../utils/game';

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
  isDealer: boolean = false,
) => {
  return cards.map(card => (
    <div class={Styles.cardContainer} key={card.id}>
      <CardComponent title={card.title} isHidden={card.isHidden}>
        {card.optionalValues && !isDealer ? (
          <ValueSelect
            id={card.id}
            values={card.optionalValues}
            onSelect={selectCardValue}
            activeValue={card.value}
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
  return (
    <div class={Styles.container}>
      <div class={Styles.table}>
        <div class={Styles.tableTitle}>Dealer</div>
        <div class={Styles.cards}>
          {renderCards(
            gameState.dealerCards,
            selectCardValue(gameActions.selectCardValue),
            true,
          )}
        </div>
      </div>
      <div class={Styles.table}>
        <div
          class={`${Styles.tableTitle} ${
            gameState.userScore > MAXIMUM_SCORE ? Styles.invalid : ''
          }`}
        >{`Your score: ${gameState.userScore}`}</div>
        <div class={Styles.cards}>
          {renderCards(
            gameState.userCards,
            selectCardValue(gameActions.selectCardValue),
          )}
        </div>
      </div>
      <div class={Styles.actions}>
        <div class={Styles.btn}>
          <Button
            onClick={gameActions.drawUserCard}
            disabled={gameState.gameStatus === GameStatus.ValueChangeNeeded}
          >
            DRAW
          </Button>
        </div>
        <div class={Styles.btn}>
          <Button
            onClick={gameActions.simulateDealer}
            disabled={gameState.gameStatus === GameStatus.ValueChangeNeeded}
          >
            STAND
          </Button>
        </div>
      </div>
      <GameStatusOverlay
        status={gameState.gameStatus}
        restartGame={restartGame}
      />
    </div>
  );
};

export default Game;
