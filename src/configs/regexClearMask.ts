const regexClearMask: RegExp = /\.|\(|\)|\-|\_|\s|\/+/g;

export function clearMask(value: string): string {
  return value && value.replace(regexClearMask, '');
}
