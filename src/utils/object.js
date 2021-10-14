import Vue from "vue";

export function set(obj, key, value) {
  const keys = key.split(".");
  const lastKey = keys.pop();
  const o = keys.reduce((o, key) => o[key], obj);

  // o[lastKey] = value;
  // The statement below is not ok
  // because Vue can not detect property addition or deletion.
  // https://vuejs.org/v2/guide/reactivity.html#For-Objects
  Vue.set(o, lastKey, value);
}

export function get(obj, key) {
  const keys = key.split(".");
  return keys.reduce((obj, key) => obj[key], obj);
}

export function deepCopy(obj) {
  if (typeof obj !== "object") return obj;
  return Object.entries(obj).reduce(
    (newObj, [key, value]) => ((newObj[key] = deepCopy(value)), newObj),
    {}
  );
}
