# Constructable DB

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

const Users = new Model("users", db.path, userSchema);

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