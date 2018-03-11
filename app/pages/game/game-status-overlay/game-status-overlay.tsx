import { h } from 'hyperapp';
import * as Styles from './game-status-overlay.css';
import { GameStatus } from '../../../interfaces/game';

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
      {getResultTitle(status)}
      <button onclick={restartGame}>PLAY AGAIN</button>
    </div>
  );
};

export default GameStatusOverlay;
