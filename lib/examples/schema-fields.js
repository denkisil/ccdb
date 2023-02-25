import {Schema, SchemaTypes} from "./Schems.js"; // change "./Schema.js" to "ccdb";

const Schema = new Schema({
	id: {
		type: SchemaTypes.number
	},
	// available schema field parameters
	name: {
		type: SchemaTypes.string, // value type for validating data
		default: "Unnamed", // value will insert when no have value to insert
		required: false, // value requires to insert or not
		maxLength: 90, // string value length don't be more that specified
		minLength: 12, // string value length don't be less that specified
		unique: false, // one value for one field if true
		max: null, // number value don't be more that specified
		min: null, // number value don't be less that specified
	}
})