import Prism from 'prism-es6';

const highlight = {
  deep: true,
  bind: bind,
  componentUpdated: (el) => {
    bind(el);
  },
};

function bind (el) {
  Prism.highlightAllUnder(el);
}

export default highlight;
