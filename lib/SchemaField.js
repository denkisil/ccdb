import {SchemaTypes} from "./Schema.js";

import {
	RequiredOptionHasNoGotData,
	InvalidSchemaOptionType,
	DataParamInvalidTypeOf,
	NotDataTypeDefined
} from "#errors";

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

export default SchemaField;