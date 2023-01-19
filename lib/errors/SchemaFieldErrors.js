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

class MinValueBigestThanMaxValue extends Error {
	constructor () {
		super(`min value have bigest value than max value of schema field`);

		this.name = "MinValueBigestThanMaxValue";
	}
}

class MinValueEqualsMaxValue extends Error {
	constructor () {
		super(`min value equals max value of schema field`);

		this.name = "MinValueEqualsMaxValue";
	}

}

class MaxLengthShortenThanMinLength extends Error {
	constructor () {
		super(`max length of string shorten than min length of string`);

		this.name = "MaxLengthShortenThanMinLength";
	}
}

class MaxLengthEqualsMinLength extends Error {
	constructor () {
		super(`max length equals min length`);

		this.name = "MaxLengthEqualsMinLength";
	}
}

class MinLengthShortenThanZero extends Error {
	constructor () {
		super(`min length shorten than zero`);

		this.name = "MinLengthShortenThanZero";
	}
}

export {
	MaxLengthShortenThanMinLength,
	MinValueBigestThanMaxValue,
	RequiredOptionHasNoGotData,
	MaxLengthEqualsMinLength,
	MinLengthShortenThanZero,
	MinValueEqualsMaxValue,
	NotDataTypeDefined
}