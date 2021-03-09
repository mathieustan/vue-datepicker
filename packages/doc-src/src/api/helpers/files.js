import Vue from 'vue';

export {
  parseComponent,
};

function parseComponent (component) {
  return {
    props: parseProps(component),
    mixins: parseMixins(component),
  };
}

// --------------------------
// Handle props
// --------------------------
function parseProps (component, array = []) {
  const options = component.options;
  const name = component.options.name;
  const mixins = [component.super].concat(options.extends).concat(options.mixins).filter(m => !!m);
  const props = options.props || {};

  Object.keys(props).forEach(key => {
    const generated = genProp(key, props[key], mixins, name);
    array.push(generated);
  });

  return array.sort((a, b) => a.name.localeCompare(b.name));
}

function genProp (name, prop, mixins, cmp) {
  const type = getPropType(prop.type);
  const source = getPropSource(name, mixins) || cmp;

  return {
    name,
    type,
    default: getPropDefault(prop.default, type),
    source,
  };
}

function getPropType (type) {
  if (Array.isArray(type)) {
    return type.map(t => getPropType(t));
  }

  if (!type) return 'any';

  return type.name.toLowerCase();
}

function getPropDefault (def, type) {
  if (def === '' ||
    (def == null && type !== 'boolean' && type !== 'function')
  ) {
    return 'undefined';
  } else if (typeof (def) === 'function' && type !== 'function') {
    def = def.call({});
  }

  if (type === 'boolean') {
    return def ? 'true' : 'false';
  }

  if (type === 'string') {
    return def ? `'${def}'` : def;
  }

  if (type === 'function') {
    return parseFunctionParams(def);
  }

  return def;
}

function parseFunctionParams (func) {
  const groups = /function\s_.*\((.*)\)\s\{.*/i.exec(func);
  if (groups && groups.length > 1) return `(${groups[1]}) => {}`;
  else return 'null';
}

function getPropSource (name, mixins) {
  const source = null;
  for (let i = 0; i < mixins.length; i++) {
    let mixin = mixins[i];
    if (mixin.name !== 'VueComponent') mixin = Vue.extend(mixin);

    if (mixin.options.name) {
      const source = Object
        .keys(mixin.options.props || {})
        .find(p => p === name) && mixin.options.name;
      const found = getPropSource(name, [mixin.super]
        .concat(mixin.options.extends)
        .concat(mixin.options.mixins).filter(m => !!m)) || source;
      if (found) return found;
    }
  }

  return source;
}

// --------------------------
// Handle Mixins
// --------------------------
function parseMixins (component) {
  if (!component.options.mixins) return [];

  let mixins = [];
  for (let i = 0; i < component.options.mixins.length; i++) {
    let mixin = component.options.mixins[i];

    if (mixin.name !== 'VueComponent') mixin = Vue.extend(mixin);

    if (mixin.options.name) {
      mixins.push(mixin.options.name);

      if (mixin.options.mixins) {
        mixins = mixins.concat(parseMixins(mixin));
      }
    }
  }

  return mixins.sort((a, b) => a > b);
}
