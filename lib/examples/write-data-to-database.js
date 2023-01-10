import {Database, SchemaTypes, Schema, Model} from "../index.js"; // change `../index.js` to `ccdb

import path from "path";

const dbPath = path.join(process.cwd(), "../../db");
const db = new Database(dbPath);

const simpleSchemaTemplate = {
	name: {
		type: SchemaTypes.string,
		required: true
	},
	age: {
		type: SchemaTypes.number,
		default:18
	}
}

const simpleSchema = new Schema(simpleSchemaTemplate);
const SimpleModel = new Model("simple", simpleSchema, db.path);
db.addModel(SimpleModel.name, SimpleModel);

// important to follow the above scheme. else you can to get error about not validating data according scheme
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

// for writing data to database we have two methods:

// you can use `Model.writeOne` for writing one object to database
SimpleModel.writeOne(users[0]);

// for writing array of objects you can use `Model.writeMany`
SimpleModel.writeMany(users);

// but you must remember what CCDB don't checks data doublations.

// for reading all database data we'll use `Model.read`. 
const allData = SimpleModel.read();

console.log(allData)
// remember - `Model.read` returns all data about model (includes schema, name). so if you'll need get only data of database, use parameter .data (i.e Model.read().data)