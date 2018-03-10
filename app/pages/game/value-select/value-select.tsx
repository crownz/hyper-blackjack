import { h } from "hyperapp"
import * as Styles from './value-select.css';

interface Props {
  values: number[];
  onSelect: (value: number) => void;
}

const ValueSelect = ({ values, onSelect }: Props) => (
  <div class={Styles.container}>
    {values.map(value => (
      <div key={value} onclick={() => onSelect(value)} class={Styles.value}>
        {value}
      </div>
    ))}
  </div>
);

export default ValueSelect;
