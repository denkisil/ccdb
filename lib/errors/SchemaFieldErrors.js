class RequiredOptionHasNoGotData extends Error {
	constructor () {
		super(`required option has no got data`);

		this.name = "RequiredOptionHasNoGotData";
	}
}

class NotDataTypeDefined extends Error {
	constructor () {
		super("a `type` field of schema param isn't defined");

		this.name = "NotDataTypeDefined";
	}
}

export {
	RequiredOptionHasNoGotData,
	NotDataTypeDefined
}