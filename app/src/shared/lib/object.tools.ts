export function isObject(data: unknown) {
  return Object.getPrototypeOf(data) === Object.getPrototypeOf({});
}
