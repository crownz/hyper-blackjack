import { h } from 'hyperapp';
import * as Styles from './value-select.css';

interface Props {
  values: number[];
  id: string;
  onSelect: (cardId: string, value: number) => void;
}

const ValueSelect = ({ values, onSelect, id }: Props) => (
  <div class={Styles.container}>
    {values.map(value => (
      <div key={value} onclick={() => onSelect(id, value)} class={Styles.value}>
        {value}
      </div>
    ))}
  </div>
);

export default ValueSelect;
