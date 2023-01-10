import Model from "./Model.js";
import Database from "./Database.js";
import {Schema, SchemaTypes} from "./Schema.js";
import FS from "./FileSystem.js";

import path from "path";

let db = new Database(path.join(process.cwd(), "db"));

let simp = new Schema({
	id: {
		type: SchemaTypes.number,
		required: true
	},
	name: {
		type: SchemaTypes.string,
		required: true
	},
	values: {
		type: SchemaTypes.array,
		default: []
	}
});

let simpdb = new Model("simp", simp, db.path);

db.addModel(simpdb.name, simpdb);

simpdb.writeOne({id: 1, name: "Joe"});

console.log(simpdb.read().data);

export {
	SchemaTypes, 
	Database,
	Schema,
	Model
}