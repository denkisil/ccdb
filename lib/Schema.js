import {
	StringLengthShortenThanSchemaLength,
	StringLengthBigestThanSchemaLength,
	DataValueShortenThanSchemaMinValue,
	DataValueBigestThanSchemaMaxValue,
	MaxLengthShortenThanMinLength,
	MinValueBigestThanMaxValue,
	RequiredOptionHasNoGotData,
	InvalidSchemaTepmlateType,
	MinLengthShortenThanZero,
	MaxLengthEqualsMinLength,
	MinValueEqualsMaxValue,
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

	// Schema.dataValidByScheme - does data validation according with scheme

	// requires:
	// data: Object = data to validation

	dataValidByScheme(data) {

		if (!(typeof data == "object") || (data instanceof Array))
			throw new DataIsntObject(typeof data);

		for (const key of Object.keys(this.schema)) {

			if (!Object.keys(data).includes(key))
				throw new NotParameterRequiredBySchema(key);

			if (this.schema[key].required && !data[key]) 
				throw new RequiredOptionHasNoGotData()

			if (this.schema[key].required && typeof data[key] != this.schema[key].type)
				throw new DataParamInvalidTypeOf(typeof data[key]);

			if (this.schema[key].maxNumValue && data[key] > this.schema[key].maxNumValue)
				throw new DataValueBigestThanSchemaMaxValue();

			if (this.schema[key].minNumValue && data[key] < this.schema[key].minNumValue)
				throw new DataValueShortenThanSchemaMinValue();

			if (this.schema[key].maxStringLength && data[key].length > this.schema[key].maxStringLength)
				throw new StringLengthBigestThanSchemaLength();

			if (this.schema[key].minStringLength && data[key].length < this.schema[key].minStringLength)
				throw new StringLengthShortenThanSchemaLength();
		}

		return true;
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

		if (fieldParams.type === SchemaTypes.number 
			&& fieldParams.max || fieldParams.min) {

			if (fieldParams.max < fieldParams.min) 
				throw new MinValueMorestThanMaxValue();

			if (fieldParams.max == fieldParams.min) 
				throw new MinValueEqualsMaxValue();

		}

		if (fieldParams.type === SchemaTypes.string
			&& fieldParams.maxLength || fieldParams.minLength) {

			if (fieldParams.maxLength < fieldParams.minLength) 
				throw new MaxLengthShortenThanMinLength();

			if (fieldParams.maxLength == fieldParams.minLength)
				throw new MaxLengthEqualsMinLength();

			if (fieldParams.minLength < 0)
				throw new MinLengthShortenThanZero();

		}		

		this.type = fieldParams.type;
		this.required = fieldParams.required && typeof fieldParams.required == 'boolean' ? fieldParams.required : false;
		this.defaultValue = !this.required ? fieldParams.default : null;
		this.maxNumValue = this.type === SchemaTypes.number && fieldParams.max ? fieldParams.max : this.type === SchemaTypes.number && !fieldParams.max ? Number.MAX_SAFE_INTEGER : null;
		this.minNumValue = this.type === SchemaTypes.number && fieldParams.min ? fieldParams.min : this.type === SchemaTypes.number && !fieldParams.min ? Number.MIN_SAFE_INTEGER : null;
		this.maxStringLength = this.type === SchemaTypes.string && fieldParams.maxLength ? fieldParams.maxLength : this.type === SchemaTypes.string && !fieldParams.maxLength ? 2**53-1 : null;
		this.minStringLength = this.type === SchemaTypes.string && fieldParams.minLength ? fieldParams.minLength : this.type === SchemaTypes.string && !fieldParams.minLength ? 0 : null;
	}
}

export {Schema, SchemaTypes}