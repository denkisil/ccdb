import {Schema, SchemaTypes} from "./Schems.js"; // change "./Schema.js" to "ccdb";

const Schema = new Schema({
	id: {
		type: SchemaTypes.number
	},
	// available schema field parameters
	name: {
		type: SchemaTypes.string,
		required: false,
		default: "Unnamed",
		max: null,
		min: null,
		maxLength: 90,
		minLength: 12
	}
})