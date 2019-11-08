export {
  prepareSettingsForStory,
};

function prepareSettingsForStory ({ props = {}, events = {} }) {
  const formattedAttrs = Object
    .entries(props)
    .reduce((newAttrs, [key, values]) => [...newAttrs, generateDefaultAttr(key, values)], [])
    .join('');

  const formattedBinds = Object
    .entries(props)
    .reduce((newBinds, [key, values]) => ({ ...newBinds, [key]: values.value }), {});

  const formattedEvents = Object
    .entries(events)
    .reduce((newEvents, [key, values]) => [...newEvents, generateEventAttr(key, values)], [])
    .join('');

  const formattedListeners = Object
    .entries(events)
    .reduce((newListeners, [key, values]) => ({ ...newListeners, [key]: `${values.method}(${values.data})` }), {});

  return {
    formattedAttrs,
    formattedBinds,
    formattedEvents,
    formattedListeners,
  };
}

function formatCamelToAttrString (string) {
  return string.replace(/[\w]([A-Z])/g, (word) => `${word[0]}-${word[1]}`).toLowerCase();
}

// Used for component, looks like :prop="value"
function generateDefaultAttr (key, values) {
  if (!values) return;
  let str = '\n  ';
  if (values.type !== String) str += ':';
  str += `${formatCamelToAttrString(key)}="${values.value}"`;
  return str;
}

// Used for component, looks like @prop="method(value)"
function generateEventAttr (key, values) {
  if (!values.data) return `\n  @${key}="${values.method}"`;
  return `\n  @${key}="${values.method}(${values.data})"`;
}
