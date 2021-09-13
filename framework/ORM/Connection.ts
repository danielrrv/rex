import { Results, TConnection } from "../global";
import{database as config} from './config';


export class Connection {
	protected static connections: TConnection = config;
	public static clientName = process.env.DB_CONNECTION ;

	public static setConfig(config: TConnection) {
		Connection.connections = config;
	}
	public static setConnectionName(name:string){
		Connection.clientName = name;
	}
	public static getConfig() {
		return Connection.connections
	}

	public async getConnection(name: string) {
		try {
			const client = Connection.connections[name]
			if (!client) throw new Error("No client defined");
			if (Connection.clientName == 'mysql') {
				return new Promise((resolve, reject) => {
					client.getConnection((err, conn) => {
						if (err) reject(err)
						// Use the connection
						resolve(conn)
					})
				});
			} else if (Connection.clientName == 'postgres') {
				return client;
			} else if (Connection.clientName == 'mock') {
				return client
			} else {
				throw new Error("No client found!")
			}
		} catch (error) {
			throw error;
		}
	}
	public async Statement(query: string) {
		try {
			const conn = await this.getConnection(Connection.clientName);
			return new Promise((resolve, reject) => {
				if (Connection.clientName == 'mysql') {
					conn.query(query, (error, results, _) => {
						conn.release();
						// Handle error after the release.
						if (error) reject(error);
						else resolve(JSON.parse(JSON.stringify(results)));
					})
				} else if (Connection.clientName == 'postgres') {
					const result = conn`${query}`;
					resolve(result);
				} else if (Connection.clientName == 'mock') {
					resolve(conn(query));
				} else {
					throw new Error("No client found!")
				}
			})
		} catch (error) {
			throw error;
		}
	}
}




