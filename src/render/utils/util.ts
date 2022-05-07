export function debounce(fn: Function, ms: number = 2000) {
  let timer: NodeJS.Timeout;
  return function (...args: any[]) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(fn.bind(this, ...args, ms));
  };
}
