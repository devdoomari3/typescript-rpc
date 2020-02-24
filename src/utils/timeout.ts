export function doTimeout(timeoutMs: number) {
  return new Promise<void>(resolve => {
    setTimeout(resolve, timeoutMs);
  });
}