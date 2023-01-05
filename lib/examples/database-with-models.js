import {Database, SchemaTypes, Schema, Model} from "../index.js"; // change `../index.js` to `ccdb

import path from "path";

// process.cwd() = __dirname in CommonJS
const dbPath = path.join(process.cwd(), "../../db");

const db = new Database(dbPath);

// this object is a schema template, against which the data will be checked
const simpleSchemaTemplate = {
	name: SchemaTypes.string,
	age: SchemaTypes.number
}

// creates a schema for new model. as a agrument Schema class requires a object-template, against which the data will be checked
const simpleSchema = new Schema(simpleSchemaTemplate);

// creates a model for managing data at model borders. Models - individual database files. For any model - individual file
const SimpleModel = new Model("simple", simpleSchema, db.path);

// add SimpleModel to database, then creates database file for this model
db.addModel(SimpleModel.name, SimpleModel);