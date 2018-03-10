import { h } from 'hyperapp';
import * as Styles from './card.css';

interface Props {
  title: string;
}

const Card = ({ title }: Props, children: JSX.IntrinsicElements) => (
  <div class={Styles.card}>
    <div class={Styles.title}>{title}</div>
    {children}
  </div>
);

export default Card;
