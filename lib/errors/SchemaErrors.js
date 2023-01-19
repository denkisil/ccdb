class InvalidSchemaTepmlateType extends Error {
	constructor (schemaTemplate) {
		super(`schema type isn't object, but ${typeof schemaTemplate}`);

		this.name = "InvalidSchemaTepmlateType";
	}
}

class DataValueBigestThanSchemaMaxValue extends Error {
	constructor () {
		super(`value is morest than max value which was set in schema`);

		this.name = "DataValueBigestThanSchemaMaxValue";
	}
}

class DataValueShortenThanSchemaMinValue extends Error {
	constructor () {
		super(`value is shorten than max value which was set in schema`);

		this.name = "DataValueShortenThanSchemaMinValue";
	}
}

class StringLengthBigestThanSchemaLength extends Error {
	constructor () {
		super(`string legth morest than max length which was set in schema`);

		this.name = "StringLengthBigestThanSchemaLength";
	}
}

class StringLengthShortenThanSchemaLength extends Error {
	constructor () {
		super(`string legth shorten than min length which was set in schema`);

		this.name = "StringLengthShortenThanSchemaLength";
	}
}

class InvalidSchemaOptionType extends Error {
	constructor (schemaOptionType) {
		super(`type of schema's param isn't found in available shema types: ${schemaOptionType}`);

		this.name = "InvalidSchemaOptionType";
	}
}

class NotParameterRequiredBySchema extends Error {
	constructor (dataKey) {
		super (`cannot find param, required by scheme: ${dataKey}`);

		this.name = "NotParameterRequiredBySchema";
	}
}

class DataParamInvalidTypeOf extends Error {
	constructor (typeOfDataKey) {
		super(`wrong type of data parameter:  ${typeOfDataKey}`);

		this.name = "DataParamInvalidTypeOf";
	}
}

class InvalidSchema extends Error {
	constructor () {
		super(`cannot find valid schema`);

		this.name = "InvalidSchema";
	}
}

export { 
	StringLengthShortenThanSchemaLength,
	DataValueShortenThanSchemaMinValue,
	DataValueBigestThanSchemaMaxValue,
	StringLengthBigestThanSchemaLength,
	NotParameterRequiredBySchema,
	InvalidSchemaTepmlateType,
	InvalidSchemaOptionType, 
	DataParamInvalidTypeOf, 
	InvalidSchema
}