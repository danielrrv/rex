import { Results, TConnection } from "../global";
import {Connection} from "./Connection";
import { database as config } from '../../app/config'// constructor




export class Database extends Connection {
	protected connections: TConnection;
	private clientName: string;

	public constructor(config: TConnection, dbConnection: string) {
		super()
		this.clientName = process.env.DB_CONNECTION || "mysql"
		this.connections = config;
	}
	public getConnection() {
		return super.getConnection(this.clientName)
	}

	public async Statement(query: string): Promise<Results[]> {
		return new Promise((resolve, reject) => {
			if (this.clientName == 'mysql') {
				this.getConnection().getConnection(async (err, conn) => {
					if (err) reject(err); // not connected!
					// Use the connection
					conn.query(query, (error, results, _) => {
						conn.release();
						// Handle error after the release.
						if (error) reject(error);
						else resolve(JSON.parse(JSON.stringify(results)));
					});
				});
			} else if (this.clientName == 'postgres') {
				return this.getConnection();
			} else {
				throw new Error("No client found!")
			}
		});
	}
}