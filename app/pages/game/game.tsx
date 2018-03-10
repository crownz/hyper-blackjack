import { h } from "hyperapp"
import * as Styles from './game.css';

interface Props {
  drawCard: () => void;
  userCards: Card[];
}

const renderCards = (cards: Card[]) => {
  console.log('rendering', cards);
  return cards.map(card => (
    <div class={Styles.card} key={card.id}>{card.title}</div>
  ));
};

const Game = ({ drawCard, userCards }: Props) => (
  <div class={Styles.container}>
    {renderCards(userCards)}
    <button onclick={drawCard}>DRAW</button>
  </div>
);

export default Game;
