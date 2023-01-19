class DataIsntArrayOfData extends Error {
	constructor () {
		super (`cannot read non-array object for multiple write to database`);

		this.name = "DataIsntArrayOfData";
	}
}

class TypeOfParamIsntString extends Error {
	constructor () {
		super (`param name isn't a string`);

		this.name = "TypeOfParamIsntString";
	}
}

class InvalidTypeOfDataToWrite extends Error {
	constructor (typeOfData) {
		super (`data isn't object, but ${typeOfData}`);

		this.name = "InvalidTypeOfDataToWrite";
	}
}

class ModelIsInvalid extends Error {
	constructor () {
		super (`model of database is invalid`);

		this.name = "ModelIsInvalid";
	}
}

class ModelNameNotDefined extends Error {
	constructor () {
		super (`model name not defined`);

		this.name = "ModelNameNotDefined"
	}
}

export {
	TypeOfParamIsntString,
	ModelNameNotDefined,
	DataIsntArrayOfData,
	InvalidTypeOfDataToWrite,
	ModelIsInvalid
}