
export function getNestedValue(obj, path) {
  const keys = path.split('.');
  let current = obj;
  for (let key of keys) {
    if (current[key] === undefined) return undefined;
    current = current[key];
  }
  return current;
}

export function setNestedValue(obj, path, value) {
  const keys = path.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (current[keys[i]] === undefined) current[keys[i]] = {};
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
}

