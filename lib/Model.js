import {Schema, SchemaTypes} from "./Schema.js";
import FS from "./FileSystem.js";

import {
	NotParameterRequiredBySchema,
	DataParamInvalidTypeOf,
	TypeOfParamIsntString,
	DataIsntArrayOfData,
	DataIsntObject,
	InvalidSchema
} from "#errors";

import * as path from "path";
import * as fs from "fs";


// class Model - creates models - a separate entities of DB
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
	// - schema: Schema = schema of model
	// - filePath: String = path to all database files
	constructor (name, schema, filePath) {
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
			throw new DataIsntObject(typeof data);

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
				throw new DataIsntObject(typeof data);

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
					throw new DataIsntObject(typeof element);

				const dataIsValid = this.dataValidByScheme(element);

				this.writeOne(element);
			}

		} catch (error) {
			throw error;
		}
	}

	// Model.getDocByParam - get document from database by few parameters

	// requires:
	// - paramValuesObj: Object = object of params, by which you want to found doc
	getDocByParams (paramValuesObj) {
		if (!typeof paramValuesObj == 'object' || paramValuesObj instanceof Array) 
			throw new DataIsntObject(typeof paramValuesObj);

		const data = this.read().data;

		const gotData = data.filter(element => {
			for (const key of Object.keys(paramValuesObj)) 
				if (element[key] != paramValuesObj[key]) 
					return null;

			return element;
		});

		return gotData;
	}

	// Model.updateDocByParam - update document in database, which goted by few parameters

	// requires:
	// paramValuesObj: Object = object of params, by which you want to found doc
	// updateValuesObj: Object = object of params to update
	updateDocByParams (paramValuesObj, updateValuesObj) {
		if ((typeof paramValuesObj != 'object' && paramValuesObj instanceof Array) || 
			(typeof updateValuesObj != 'object' && updateValuesObj instanceof Array))
			throw new DataIsntObject(typeof paramValuesObj || updateValuesObj);

		const gotData = this.getDocByParams(paramValuesObj)[0] || null;

		if (gotData === null) 
			throw new Error(`Cannot find doc by ${JSON.stringify(paramValuesObj)}`);

		this.deleteDocByParams(paramValuesObj);

		for (const key of Object.keys(updateValuesObj)) {
			if (!gotData[key]) 
				throw new Error(`cannot get ${key} from goted data`);

			gotData[key] = updateValuesObj[key];
		}

		this.writeOne(gotData)

		return gotData;
	}

	// Model.deleteDocByParams - delete doc/docs by few parameters

	// requires:
	// - paramValuesObj: Object = object of params, by which you want to found doc
	deleteDocByParams (paramValuesObj) {
		try {
			const data = this.read().data;

			const existsDoc = this.getDocByParams(paramValuesObj)[0] || null;

			if (existsDoc === null) 
				throw new Error(`Cannot find doc by ${JSON.stringify(paramValuesObj)}`);

			this.fs.clearDatabaseData(this.fullPath);

			const newData = data.filter(element => {
				for (const key of Object.keys(paramValuesObj)) {
					if (!element[key])
						throw new Error(`cannot get ${key} from goted data`);

					if (element[key] == paramValuesObj[key])
						return null

					return element;
				}
			});

			this.writeMany(newData);

		} catch (error) {
			throw error;
		}
	}

}

export default Model