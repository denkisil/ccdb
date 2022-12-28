# **C**onstru**c**table DB

Simple data storage based on JSON format.

# Install
```
npm i ccdb
```

Example of work with CCDB:
```js 
import {SchemaTypes, Schema, Model, Database} from "ccdb";

import {fileURLToPath} from "url";
import * as path from "path";

let __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);

let db = new Database(path.join(__dirname, "db"));

let userModelTemp = {
	id: SchemaTypes.number,
	name: SchemaTypes.string
}

let userSchema = new Schema(userModelTemp);

let Users = new Model("users", db.path, userSchema);

db.addModel(Users.name, Users);

let users = [
	{
		id: 1,
		name: "Joe"
	},
	{
		id: 2,
		name: "Steve"
	}
]

let writed = Users.writeMany(users);

let deleted = Users.deleteDocsByParam("id", 1);

let usersAll = Users.read();

console.log(users);

```