


import { TConnection } from '../global'
//For what: Apps may have many connections. From Sql/No sql clients to redis,SQS, MQTT and others.
//FOr users
export abstract class Connection {
	protected abstract connections: TConnection;
	public getConnection(name: string) {
		try {
			return this.connections[name]
		} catch (error) {
			throw error;
		}
	}
}