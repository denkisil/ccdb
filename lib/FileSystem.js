import path from "path";
import fs from "fs";

import {
	NotExistsFileByPath
} from "#errors";


// class FS (from FileSystem) - class for direct control on the database files

// you don't need use this class for work with database. it's made as a layer between low-level file work and a high-level Models API
class FS {
	constructor () {
		this.dbPath = '';
	}

	// FS.createDatabaseFolder - makes a folder, where will be placed db

	// requires:
	// dbPath: String = full path to new database folder
	createDatabaseFolder (dbPath) {
		try {
			fs.mkdirSync(dbPath);

			this.dbPath = dbPath;
		} catch (error) {
			throw error;
		}
	}

	// FS.readDatabaseFile - reads all database file

	// requires:
	// modelPath: String = full path to existing database file
	readDatabaseFile (modelPath) {
		try {
			if (!fs.existsSync(modelPath))
				throw new NotExistsFileByPath(modelPath);

			const data = fs.readFileSync(modelPath, 'utf-8');

			return JSON.parse(data);
		} catch (error) {
			throw error;
		}
	}

	// FS.writeDataToDatabase - writes data to database file

	// requires:
	// modelPath: String = full path to existsing database file
	// data: Object = data to write
	writeDataToDatabase (modelPath, data) {
		try {
			if (!fs.existsSync(modelPath))
				throw new NotExistsFileByPath(modelPath);

			const oldData = this.readDatabaseFile(modelPath);

			oldData.data.push(data);

			fs.writeFileSync(modelPath, JSON.stringify(oldData));
		} catch (error) {
			throw error;
		}
	}

	// FS.addDatabaseFile - adds new database file

	// requires:
	// name: String =  name of new database file
	// schema: Schema = schema of new database file
	addDatabaseFile (name, schema, dbPath) {
		try {
			fs.writeFileSync(path.join(dbPath, name), JSON.stringify({name, schema, data: []}));	
		} catch (error) {
			throw error;
		}
	}

	// FS.clearDatabaseData - clears all data in database file

	// requires:
	// modelPath: String = full path to existsing database file
	clearDatabaseData (modelPath) {
		try {
			if (!fs.existsSync(modelPath)) 
				throw new NotExistsFileByPath(modelPath);

			const oldData = this.readDatabaseFile(modelPath);

			oldData.data = [];

			fs.writeFileSync(modelPath, JSON.stringify(oldData))
		} catch (error) {
			throw error;
		}
	}
}

export default FS;