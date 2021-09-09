import { Database }from "../ORM/database";

export class Booter {
	readonly MySQLClient: Database
	readonly PostgreSQLClient: Database
	readonly databaseConfig
	public constructor(databaseConfig) {
		this.databaseConfig = databaseConfig
		this.MySQLClient = new Database(databaseConfig, 'mysql')
		this.PostgreSQLClient = new Database(databaseConfig, 'postgres')
	}
}