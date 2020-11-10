export {
  addOnceEventListener,
  generateRandomId,
  validateAttachTarget,
  convertToUnit,
  getSlotType,
  getSlot,
  getZIndex,
  deepMerge,
};

function addOnceEventListener (el, eventName, cb, options = false) {
  const once = (event) => {
    cb(event);
    el.removeEventListener(eventName, once, options);
  };

  el.addEventListener(eventName, once, options);
}

function generateRandomId () {
  return `_${Math.random().toString(36).substr(2, 9)}`;
}

function validateAttachTarget (value) {
  const type = typeof value;
  if (type === 'boolean' || type === 'string') return true;
  return value.nodeType === Node.ELEMENT_NODE;
}

function convertToUnit (value) {
  if (value == null || value === '') return;
  if (isNaN(+value)) return String(value);
  return `${Number(value)}px`;
}

function getSlotType (vm, name, split) {
  if (vm.$slots[name] && vm.$scopedSlots[name] && (vm.$scopedSlots[name]).name) {
    return split ? 'v-slot' : 'scoped';
  }
  if (vm.$slots[name]) return 'normal';
  if (vm.$scopedSlots[name]) return 'scoped';
}

function getSlot (vm, name = 'default', data = {}, optional = false) {
  if (vm.$scopedSlots[name]) {
    return vm.$scopedSlots[name] && vm.$scopedSlots[name](data);
  } else if (vm.$slots[name] && (!data || optional)) {
    return vm.$slots[name];
  }
  return;
}

function getZIndex (el) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return 0;

  const index = +window.getComputedStyle(el).getPropertyValue('z-index');

  if (!index) return getZIndex(el.parentNode);
  return index;
}

function deepMerge (source = {}, target = {}) {
  // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
  for (const key of Object.keys(source)) {
    /* istanbul ignore next */
    if (source[key] instanceof Object) Object.assign(source[key], deepMerge(target[key], source[key]));
  }

  // Join `target` and modified `source`
  Object.assign(target, source);
  return target;
}
