const h = require('snabbdom/h').default;

export default (data) => ({
  afterRender: res => {
    return h('div.all-layers', {}, [
      h('div.top-layer', {}, res.top),
      h('div.bottom-layer', {}, res.bottom),
    ]);
  }
});