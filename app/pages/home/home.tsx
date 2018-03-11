import { h } from 'hyperapp';

import Button from '../../components/button';

import * as Styles from './home.css';

interface Props {
  startGame: () => void;
}

const Home = ({ startGame }: Props) => (
  <div class={Styles.container}>
    <Button onClick={startGame}>START</Button>
  </div>
);

export default Home;
