import {Schema, SchemaTypes} from "./Schema.js";
import FS from "./FileSystem.js";

import {
	NotParameterRequiredBySchema,
	RequiredOptionHasNoGotData,
	DataParamInvalidTypeOf,
	TypeOfParamIsntString,
	DataIsntArrayOfData,
	InvalidTypeOfDataToWrite,
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
 * 		name: {
 *			type: SchemaTypes.string,
 * 			required: true 		
 * 		}
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
			throw new InvalidSchema();

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

	// Model.writeOne - write one exemplar of data to database

	// requires:
	// - data: Object = data to write
	writeOne (data) {
		try {
			if (!(data instanceof Object) || data instanceof Array)
				throw new InvalidTypeOfDataToWrite(typeof data);

			const dataIsValid = this.schema.dataValidByScheme(data, this);

			for (const key of Object.keys(this.schema.schema)) 
				if (!this.schema.schema[key].required && !data[key])
					data[key] = this.schema.schema[key].defaultValue;
			

			this.fs.writeDataToDatabase(this.fullPath, data);
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

				const dataIsValid = this.schema.dataValidByScheme(element, this);

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
			throw new InvalidTypeOfDataToWrite(typeof paramValuesObj);

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
			throw new InvalidTypeOfDataToWrite(typeof paramValuesObj || typeof updateValuesObj);

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
			const existsDoc = this.getDocByParams(paramValuesObj)[0] || null;

			if (existsDoc === null) 
				throw new Error(`Cannot find doc by ${JSON.stringify(paramValuesObj)}`);

			const newData = this.fs.removeDoc(this.fullPath, existsDoc);

			this.fs.clearDatabaseData(this.fullPath);

			this.writeMany(newData);

		} catch (error) {
			throw error;
		}
	}
}

export default Model