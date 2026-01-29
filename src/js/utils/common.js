export function createDeferredPromise() {
  let resolve;
  let promise = new Promise((r) => (resolve = r));
  return { promise, resolve };
}
