export function encode(arg) {
  return encodeURIComponent(arg).replace(/%20/g, '+');
}

export function split(arg) {
  return ('' + arg).trim().split(/\s+/);
}
