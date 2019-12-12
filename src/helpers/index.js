export const ACTION_TYPES = {
	MERGE_SESSION: 'app/MERGE_SESSION',
	ADD_CONTRIBUTION: 'app/ADD_CONTRIBUTION'
}

export const DEFAULT_DATA = type => {
	const DEFAULTS = new Map([
		['USER_INFO', () => { return { first_name: 'Unknown' } }],
		['DEFAULT_AVATAR']
	])
	if (DEFAULTS.has(type)) {
		return DEFAULTS.get(type)();
	}
	return null;
}