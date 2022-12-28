import {
	InvalidSchemaOptionType, 
	InvalidSchemaTepmlateType 
} from "#errors";


// schema types, available in CCDB
// CCDB have so little type, but SchemaTypes.object can be as `any` type
let SchemaTypes = {
	boolean: "boolean",
	string: "string",
	number: "number",
	object: "object",
	array: "object"
}


// class Schema - schema for model, checks data which write to db, or rather checks the validity of the writen data according to the scheme

// requires:
// - schema: Object - template of schema
// 
// example
/** 
 * let simpleSchemaTemp = {
 * 		name: SchemaTypes.string 
 * }
 * 
 * let simpleSchema = new Schema(simpleSchemaTemplate);
 */

class Schema {
	constructor (schema) {

		if (!(schema instanceof Object) || (schema instanceof Array)) 
			throw new InvalidSchemaTepmlateType(typeof schema);
		for (let value of Object.values(schema)) {
			if (!(Object.values(SchemaTypes).includes(value)))
				throw new InvalidSchemaOptionType(value);
		}

		this.schema = schema;
	}
}

export {Schema, SchemaTypes}