import { h } from 'hyperapp';
import * as Styles from './home.css';

interface Props {
  startGame: () => void;
}

const Home = ({ startGame }: Props) => (
  <div class={Styles.container}>
    <button onclick={startGame}>START</button>
  </div>
);

export default Home;
