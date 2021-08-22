import { Results } from "../global";
import Connection from "./Connection";

const mysql = require("mysql");
const postgres = require('postgres')


export default class Database extends Connection {
	protected static connection: Database;
	private static clientName = process.env.DB_CONNECTION || "mysql";

	public static getConnection() {
		return super.getConnection(Database.clientName)
	}

	public static  async Statement(query: string): Promise<Results[]> {
		return new Promise((resolve, reject) => {
			if (Database.clientName == 'mysql') {
				Database.getConnection().getConnection(async (err, connection) => {
					if (err) reject(err); // not connected!
					// Use the connection
					connection.query(query, (error, results, _) => {
						connection.release();
						// Handle error after the release.
						if (error) reject(error);
						else resolve(JSON.parse(JSON.stringify(results)));
					});
				});
			} else if (Database.clientName == 'postgres') {
				return Database.getConnection();
			} else {
				throw new Error("No client found!")
			}
		});
	}
}