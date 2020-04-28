export function encode(arg) {
  return encodeURIComponent(arg).replace(/%20/g, '+');
}
