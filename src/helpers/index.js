export const DEFAULT_DATA = type => {
  const DEFAULTS = new Map([
    ['USER_INFO', () => { return { first_name: 'Unknown' } }]
  ])
  if (DEFAULTS.has(type)) {
    return DEFAULTS.get(type)();
  }
  return null;
}