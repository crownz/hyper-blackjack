import { h } from 'hyperapp';
import * as Styles from './button.css';

interface Props {
  onClick: () => void;
  disabled?: boolean;
}

const Button = (
  { onClick, disabled = false }: Props,
  children: JSX.IntrinsicElements,
) => (
  <button
    class={`${Styles.button} ${disabled ? Styles.disabled : ''}`}
    onclick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
