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

// for reading all database data we'll use `Model.read`. 
const allData = SimpleModel.read();

console.log(allData)
// remember - `Model.read` returns all data about model (includes schema, name). so if you'll need get only data of database, use parameter .data (i.e Model.read().data)

// Model haves method `Model.getDocByParams` for getting data from db by parameters

// `Model.getDocByParams` gets data by many parameters, but method requires a object of parameters
const gotJoe = SimpleModel.getDocByParams({name: "Joe", age: 20});

// method return data, when parameters equals same fields of some doc from array of writed data
SimpleModel.updateDocByParams({name: "Joe"}, {age: 1});