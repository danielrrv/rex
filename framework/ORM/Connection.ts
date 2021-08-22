
const mysql = require("mysql");
const postgres = require('postgres')
const AWS = require("aws-sdk");
//For what: Apps may have many connections. From Sql/No sql clients to redis,SQS, MQTT and others.
export default class Connection {
	private static cachedConnection= {
		dynamodb:null
	}
	private static connections = {
		//TODO: This needs cache.
		mysql: mysql.createPool({

			password: process.env.MYSQL_PASSWORD,
			database: process.env.MYSQL_DATABASE
		}),
		postgres: postgres({
			host: process.env.POSTGRES_HOST,         // Postgres ip address or domain name
			port: process.env.POSTGRES_PORT || 5432,       // Postgres server port
			database: process.env.POSTGRES_DATABASE,         // Name of database to connect to
			username: process.env.POSTGRES_USERNAME,         // Username of database user
			password: process.env.POSTGRES_PASSWORD,         // Password of database user
			ssl: process.env.POSTGRES_SSL || false,      // True, or options for tls.connect
			max: process.env.POSTGRES_MAX_CONNECTION || 10,         // Max number of connections
		}),
		dynamodb:function(){
			if(Connection.cachedConnection.dynamodb==null){
				AWS.config.update({
					region: "us-east-1",
					accessKeyId:process.env.AWS_ACCESS_KEY_ID,
					secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
				})
				Connection.cachedConnection.dynamodb = new AWS.DynamoDB.DocumentClient()
			}
			return Connection.cachedConnection.dynamodb
		}
	}

	public static getConnection(name: string) {
		try {
			return Connection.connections[name]
		} catch (error) {
			throw error;
		}
	}

}