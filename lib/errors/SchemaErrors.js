class InvalidSchemaTepmlateType extends Error {
	constructor (schemaTemplate) {
		super(`schema type isn't object, but ${typeof schemaTemplate}`);

		this.name = "InvalidSchemaTepmlateType";
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
	NotParameterRequiredBySchema,
	InvalidSchemaTepmlateType,
	InvalidSchemaOptionType, 
	DataParamInvalidTypeOf, 
	InvalidSchema
}