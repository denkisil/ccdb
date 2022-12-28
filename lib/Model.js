import {Schema, SchemaTypes} from "./Schema.js"

import {
	NotParameterRequiredBySchema,
	InvalidTypeOfDataToWrite,
	DataParamInvalidTypeOf,
	TypeOfParamIsntString,
	DataIsntArrayOfData,
	InvalidSchema
} from "#errors";

import * as path from "path";
import * as fs from "fs";


// class Models - creates models - a separate entities of DB
// - models needs for working with data in database
// - model haves own file for data
// - model files adds by Database instance
// 
// example:
/**
 * 
 * let simpleSchemaTemp = {
 * 		name: SchemaTypes.string 
 * }
 * 
 * let simpleSchema = new Schema(simpleSchemaTemplate);
 * 
 * let Simple = new Model("simple", db.path, simpleSchema);
 **/
class Model {
	// constructor of Model class

	// requires: 
	// - name: String = name of model. also name of database file
	// - path: String = path to all database files
	// - schema: Schema = schema of model
	constructor (name, filePath, schema) {
		if (!(schema instanceof Schema ))
			new InvalidSchema();

		this.name = name;
		this.path = filePath;
		this.schema = schema;
		// path to model's file
		this.fullPath = path.join(this.path, this.name);
	}

	// Model.read - read a file of model

	read() {
		try {
			let data = fs.readFileSync(this.fullPath, 'utf-8');

			return JSON.parse(data);
		} catch (e) {
			throw e;
		}
	}

	// Model.dataValidByScheme - does data validation according with scheme

	// requires:
	// data: Object = data to validation
	dataValidByScheme(data) {
		if (!(typeof data == "object") || (data instanceof Array))
			throw new InvalidTypeOfDataToWrite(typeof data);

		for (let key of Object.keys(this.schema.schema)) {

			if (!data[key])
				throw new NotParameterRequiredBySchema(key);

			if (typeof data[key] != this.schema.schema[key])
				throw new DataParamInvalidTypeOf(typeof data[key]);

			return true;
		}
	}

	// Model.writeOne - write one exemplar of data to database

	// requires:
	// - data: Object = data to write
	writeOne (data) {
		try {
			if (!(data instanceof Object) || data instanceof Array)
				throw new InvalidTypeOfDataToWrite(typeof data);

			let oldData = this.read();

			let dataIsValid = this.dataValidByScheme(data);

			oldData.data.push(data);

			fs.writeFileSync(this.fullPath, JSON.stringify(oldData));

			return oldData.data;
		} catch (e) {
			throw e;
		}
	}

	// Model.writeMany - write a array of data to database

	// requires:
	// - data: Array = array of data to write
	writeMany (data) {
		if (!(data instanceof Array))
			throw new DataIsntArrayOfData();

		try {
			let oldData = this.read();	

			for (let el of data) {
				if (!(el instanceof Object))
					throw new InvalidTypeOfDataToWrite(typeof el);

				let dataIsValid = this.dataValidByScheme(el);

				oldData.data.push(el)
			}

			fs.writeFileSync(this.fullPath, JSON.stringify(oldData));

			return oldData.data;
		} catch (e) {
			throw e;
		}
	}

	// Model.getDocByParam - get document from database by special parameter

	// requires:
	// param: String = name of parameter, by which you want to found doc
	// value: any = value of parameter, by which you want to found doc
	getDocByParam(param, value) {
		if (typeof param != 'string')
			throw new DataParamInvalidTypeOf();

		let data = this.read().data;

		let gotData = data.filter(el => el[param] == value);

		return gotData.length != [].length ? gotData : null;
	}

	// Model.deleteDocByParam - delete doc/docs by special parameter

	// requires:
	// - param: String = name of parameter, by which you want to delete doc
	// - value: any = value of parameter, by which you want to delete doc
	deleteDocsByParam (param, value) {
		try {
			let data = this.read();

			let existsDoc = this.getDocByParam(param, value);

			if (existsDoc == null) 
				throw new Error("Cannot find doc by {`" + param + ": " + value + "}`");

			data.data = data.data.filter(el => el[param] != value);

			fs.writeFileSync(this.fullPath, JSON.stringify(data));

			return {doc: existsDoc, deleted: true, deleteBy: {param, value}};
		} catch (e) {
			throw e;
		}
	}

}

export default Model