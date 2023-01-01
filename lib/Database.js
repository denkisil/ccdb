import FS from "./FileSystem.js";
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
 * const db = new Database(__dirname)
 * ...
 * const Simple = new Model("simple", db.path, simpleSchema);
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
		this.fs = new FS();

		if (!fs.existsSync(path)) {
			this.fs.createDatabaseFolder(path);
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
				this.fs.addDatabaseFile(name, model.schema.schema, this.path);
			} catch (error) {
				throw error;
			}
		}

		this.models[name] = model;
	}
}

export default Database