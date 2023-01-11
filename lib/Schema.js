import {
	RequiredOptionHasNoGotData,
	InvalidSchemaTepmlateType,
	DataParamInvalidTypeOf,
	NotDataTypeDefined
} from "#errors";


// schema types, available in CCDB
// CCDB have so little type, but SchemaTypes.object can be as `any` type
const SchemaTypes = {
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
 * const simpleSchemaTemp = {
 * 		name: {
 *			type: SchemaTypes.string,
 * 			required: true 		
 * 		}
 * }
 * 
 * const simpleSchema = new Schema(simpleSchemaTemplate);
 */

class Schema {
	constructor (schema) {

		if (!(schema instanceof Object) || (schema instanceof Array)) 
			throw new InvalidSchemaTepmlateType(typeof schema);

		for (let key of Object.keys(schema)) 
			schema[key] = new SchemaField(schema[key]);

		this.schema = schema;
	}
}


/* class SchemaField - class for technical news. in fact it's a field of schema and need for more control in the data. 
* for user they looks like as:
* ```
* id: {
*	type: SchemaTypes.number,
*	required: true
* }
* ```  
* but for ccdb it's looks different:
* id: SchemaField {
* 	type: "number",
*	required: true,
* 	defaultValue: null
* }
*/
class SchemaField {
	constructor (fieldParams) {
		if (!fieldParams.type)
			throw new NotDataTypeDefined();

		if (!(Object.values(SchemaTypes).includes(fieldParams.type)))
			throw new InvalidSchemaOptionType(fieldParams.type);


		this.type = fieldParams.type;
		this.required = fieldParams.required && typeof fieldParams.required == 'boolean' ? fieldParams.required : false;
		this.defaultValue = !this.required ? fieldParams.default : null
	}
}

export {Schema, SchemaTypes}