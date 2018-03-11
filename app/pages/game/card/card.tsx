import { h } from 'hyperapp';
import * as Styles from './card.css';

interface Props {
  title: string;
  isHidden: boolean;
}

const Card = ({ title, isHidden }: Props, children: JSX.IntrinsicElements) => (
  <div class={`${Styles.card} ${isHidden ? Styles.hidden : ''}`}>
    <div class={Styles.title}>{title}</div>
    {children}
  </div>
);

export default Card;
