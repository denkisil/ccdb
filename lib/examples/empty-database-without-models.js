import {Database} from "../index.js"; // change `../index.js` to `ccdb

import path from "path";

// process.cwd() = __dirname in CommonJS
const dbPath = path.join(process.cwd(), "../../db");

const db = new Database(dbPath);