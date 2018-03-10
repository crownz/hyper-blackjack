import { h, app } from 'hyperapp';

const view = () => (
  <div>
    Welcome.
  </div>
)

app({}, {}, view, document.body);
