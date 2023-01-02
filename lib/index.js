import Model from "./Model.js";
import Database from "./Database.js";
import {Schema, SchemaTypes} from "./Schema.js";
import FS from "./FileSystem.js";
import path from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database(path.join(__dirname, "db"));

const userModelTemp = {
	id: SchemaTypes.number,
	name: SchemaTypes.string
}

const userSchema = new Schema(userModelTemp);

const Users = new Model("users", userSchema, db.path,);

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

export {
	SchemaTypes, 
	Database,
	Schema,
	Model
}