import {Database, SchemaTypes, Schema, Model} from "../index.js"; // change `../index.js` to `ccdb

import path from "path";

const dbPath = path.join(process.cwd(), "../../db");
const db = new Database(dbPath);

const simpleSchemaTemplate = {
	name: SchemaTypes.string,
	age: SchemaTypes.number
}

const simpleSchema = new Schema(simpleSchemaTemplate);
const SimpleModel = new Model("simple", simpleSchema, db.path);
db.addModel(SimpleModel.name, SimpleModel);

const users = [
	{
		name: "Joe", 
		age: 20
	},
	{
		name: "Steve",
		age: 34
	}
]
SimpleModel.writeMany(users);

// Model.updateDocByParams uses for updating data, which goted by some parameters
SimpleModel.updateDocByParams({name: "Joe"}, {age: 1});

// remember, what this method can update only one doc