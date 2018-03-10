import { h, app } from 'hyperapp';
import './app.css';

const view = () => (
  <div>
    Welcome.
  </div>
)

app({}, {}, view, document.body);
