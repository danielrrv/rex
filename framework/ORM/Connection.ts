

import config from '../../app/config'
//For what: Apps may have many connections. From Sql/No sql clients to redis,SQS, MQTT and others.
//FOr users
export default class Connection {
	public static connections = config;
	public static getConnection(name: string) {
		try {
			return Connection.connections[name]
		} catch (error) {
			throw error;
		}
	}
}