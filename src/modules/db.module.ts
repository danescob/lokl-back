import mysql from "mysql";
import {DB, HOST, PASSWORD, USER} from "../config/db.config";
// Create a connection to the database
export const connection = mysql.createConnection({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DB
});
// open the MySQL connection
connection.connect((error:any) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});