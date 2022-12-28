import Model from "./Model.js"

import {
	ModelNameNotDefined,
	ModelIsInvalid
} from "#errors";

import * as fs from "fs";

// class Database - main class of database
// - Database adds files for models
//
// example:
/**
 * // `__dirname` haven't in ESMAScript specification, but we'll omit this
 * 
 * let db = new Database(__dirname)
 * ...
 * let Simple = new Model("simple", db.path, simpleSchema);
 * 
 * db.addModel(Simple.name, Simple);
 **/

class Database {
	// constructor of class Database
	//
	// requires:
	// - path: String = full path to all database files
	constructor (path) {
		this.path = path

		if (!fs.existsSync(path)) {
			fs.mkdirSync(path);
		}

		this.models = {}
	}

	// Database.addModel - adds model file and save model in database models array
	//
	// requires:
	// - name: String = name of model, also name of model's file
	// - model: Model = model, which we want to add to database
	addModel (name, model) {
		if (!name 
			|| typeof name != 'string')
			throw new ModelNameNotDefined();

		if (!model 
			|| !(model instanceof Model))
			throw new ModelIsInvalid();

		if (!fs.existsSync(model.fullPath)) {
			try {	
				fs.writeFileSync(model.fullPath, JSON.stringify({name: model.name, schema: model.schema.schema, data: []}));
			} catch (e) {
				throw e;
			}
		}

		this.models[name] = model;
	}
}

export default Database