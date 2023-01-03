# Constructable DB

![npm](https://img.shields.io/npm/dt/ccdb)

Simple data storage based on JSON format.

### This is ESMAScript package. if you want to use version for CommonJS, so [welcome](https://github.com/denkisil/ccdb-commonjs)

# Install
```
npm i ccdb
```

Example of work with CCDB:
```js 
import {SchemaTypes, Schema, Model, Database} from "ccdb";

import {fileURLToPath} from "url";
import * as path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database(path.join(__dirname, "db"));

const userModelTemp = {
	id: SchemaTypes.number,
	name: SchemaTypes.string
}

const userSchema = new Schema(userModelTemp);

const Users = new Model("users", userSchema, db.path);

db.addModel(Users.name, Users);

const users = [
	{
		id: 1,
		name: "Joe"
	},
	{
		id: 2,
		name: "Steve"
	}
]

const writed = Users.writeMany(users);

const deleted = Users.deleteDocsByParam("id", 1);

const usersAll = Users.read();

console.log(users);

```

# API reference

## Database

### `new Database(/*path where db will be placed*/)` - main class of database

### Parameters
- `Database.fs` - instance of FS (FileSystem) class

- `Database.path` - path where database placed

- `Database.models` - object, which contains all added models

#### Methods
- `Database.addModel(/*name of model*/, /*instance of Model's class*/)` - adds a new model to database and creates a file of model


## `new Model(/*name of model*/, /*model's schema*/, /*path, where database placed*/)` - class for making models.

### Parameters
- `Model.fs` - instance of FS class

- `Model.name` - name of model

- `Model.path` - path where placed database

- `Model.schema` - instance of Schema

- `Model.fullPath` - path where placed database file

### Methods

- `Model.read()` - reads all database file content, includes name and schema of database

- `Model.dataValidByScheme(data to validation)` - does data validation according with scheme

- `Model.writeOne(/*object to write*/)` - write one exemplar of data to database

- `Model.writeMany(/*array of objects to write*/)` - write a array of data to database

- `Model.getDocByParam(/*name of param*/, /*value of param*/)` - get document from database by special parameter

- `Model.deleteDocByParam(/*name of param*/, // Model.deleteDocByParam - delete doc/docs by special parameter)` delete doc/docs by special parameter


## `new Schema(/*template of schema*/)` - class which makes schemas for models

### Parameters

- `Schema.schema` - template of schema


## `new FS()/*(FileSystem)*/` - class for direct control on the database files

### Parameters

- `FS.dbPath` - path where database placed

### Methods

- `FS.createDatabaseFolder(/*path to database folder*/)` - makes a folder, where will be placed db

- `FS.readDatabaseFile(/*path to database file*/)` - reads all database file

- `FS.writeDataToDatabase(/*path to database file*/, /*object to write*/)` - writes data to database file

- `FS.addDatabaseFile(/*name of database file*/, /*schema of database file*/)` - adds new database file

- `FS.clearDatabaseData(/*path to database file*/)` - clears all data in database file
