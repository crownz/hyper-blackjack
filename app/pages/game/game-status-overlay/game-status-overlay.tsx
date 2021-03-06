import { h } from 'hyperapp';

import { GameStatus } from '../../../interfaces/game';

import * as Styles from './game-status-overlay.css';
import Button from '../../../components/button';

interface Props {
  status: GameStatus;
  restartGame: () => void;
}

const isGameInProggress = (status: GameStatus) => {
  return status === GameStatus.OK || status === GameStatus.ValueChangeNeeded;
};

const getResultTitle = (status: GameStatus) => {
  switch (status) {
    case GameStatus.Lost:
      return 'You lose!';
    case GameStatus.Won:
      return 'You won!';
    case GameStatus.Draw:
      return 'Draw!';
    default:
      return '';
  }
};

const GameStatusOverlay = ({ status, restartGame }: Props) => {
  return isGameInProggress(status) ? null : (
    <div class={Styles.overlay}>
      <div class={Styles.title}>{getResultTitle(status)}</div>
      <div class={Styles.btn}>
        <Button onClick={restartGame}>PLAY AGAIN</Button>
      </div>
    </div>
  );
};

export default GameStatusOverlay;
