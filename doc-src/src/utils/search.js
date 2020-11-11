export {
  searchItems,
};

function searchItems (items = [], search) {
  let itemsFiltered;

  if (!search) itemsFiltered = items;
  search = search.toString().toLowerCase();
  if (search.trim() === '') itemsFiltered = items;
  else itemsFiltered = items.filter(item => Object.keys(item).some(key => defaultFilter(getObjectValueByPath(item, key), search)));

  return itemsFiltered.sort((a, b) => a.name.localeCompare(b.name));
}

function defaultFilter (value, search) {
  return value != null &&
    search != null &&
    typeof value !== 'boolean' &&
    value.toString().toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1;
}

function getObjectValueByPath (obj, path, fallback) {
  if (obj[path] !== undefined) return obj[path];
  path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  path = path.replace(/^\./, ''); // strip a leading dot
  return getNestedValue(obj, path.split('.'), fallback);
}

function getNestedValue (obj, path, fallback) {
  const last = path.length - 1;

  if (last < 0) return obj === undefined ? fallback : obj;

  for (let i = 0; i < last; i++) {
    if (obj == null) {
      return fallback;
    }
    obj = obj[path[i]];
  }

  if (obj == null) return fallback;

  return obj[path[last]] === undefined ? fallback : obj[path[last]];
}
