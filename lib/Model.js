import {Schema, SchemaTypes} from "./Schema.js";
import FS from "./FileSystem.js";

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
 * const simpleSchemaTemp = {
 * 		name: SchemaTypes.string 
 * }
 * 
 * const simpleSchema = new Schema(simpleSchemaTemplate);
 * 
 * const Simple = new Model("simple", db.path, simpleSchema);
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
		// middleware for manages with files
		this.fs = new FS();
		// path to model's file
		this.fullPath = path.join(this.path, this.name);
	}

	// Model.read - read a file of model

	read() {
		try {
			const data = this.fs.readDatabaseFile(this.fullPath);

			return data;
		} catch (error) {
			throw error;
		}
	}

	// Model.dataValidByScheme - does data validation according with scheme

	// requires:
	// data: Object = data to validation
	dataValidByScheme(data) {

		if (!(typeof data == "object") || (data instanceof Array))
			throw new InvalidTypeOfDataToWrite(typeof data);

		for (const key of Object.keys(this.schema.schema)) {
			if (!Object.keys(data).includes(key))
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

			const dataIsValid = this.dataValidByScheme(data);

			this.fs.writeDataToDatabase(this.fullPath, data);

			// return oldData.data;
		} catch (error) {
			throw error;
		}
	}

	// Model.writeMany - write a array of data to database

	// requires:
	// - data: Array = array of data to write
	writeMany (data) {
		if (!(data instanceof Array))
			throw new DataIsntArrayOfData();

		try {
			// const oldData = this.read();	

			for (const element of data) {
				if (typeof element != 'object' && element instanceof Array) 
					throw new InvalidTypeOfDataToWrite(typeof element);

				const dataIsValid = this.dataValidByScheme(element);

				this.writeOne(element);
			}

		} catch (error) {
			throw error;
		}
	}

	// Model.getDocByParam - get document from database by special parameter

	// requires:
	// param: String = name of parameter, by which you want to found doc
	// value: any = value of parameter, by which you want to found doc
	getDocByParam(param, value) {
		if (typeof param != 'string')
			throw new DataParamInvalidTypeOf();

		const data = this.read().data;

		const gotData = data.filter(el => el[param] == value);

		return gotData.length != [].length ? gotData : null;
	}

	// Model.deleteDocByParam - delete doc/docs by special parameter

	// requires:
	// - param: String = name of parameter, by which you want to delete doc
	// - value: any = value of parameter, by which you want to delete doc
	deleteDocsByParam (param, value) {
		try {
			const data = this.read().data;

			const existsDoc = this.getDocByParam(param, value);

			if (existsDoc === null) 
				throw new Error(`Cannot find doc by {\`${ param }: ${ value }\`}`);

			this.fs.clearDatabaseData(this.fullPath);

			const newData = data.filter(element => element[param] != value);

			this.writeMany(newData);

			return {doc: existsDoc, deleted: true, deleteBy: {param, value}};
		} catch (error) {
			throw error;
		}
	}

}

export default Model