import { Connection } from '../framework/ORM/connection'
import {RelationalModel} from '../framework/ORM/Model';
const mysql = require("mysql");

const config = {
	mysql: mysql.createPool({
		connectionLimit: process.env.MYSQL_POOL || 10,
		host: process.env.MYSQL_HOST,
		user: process.env.MYSQL_USERNAME,
		password: process.env.MYSQL_PASSWORD,
		database: process.env.MYSQL_DATABASE
	}),
	mock:function(query){
		return query;
	}
}




describe('ORM', () => {
	it('should initialize RelationalModel',async () => {
		let query = 'SELECT * FROM users;'
		Connection.setConfig(config);
		Connection.setConnectionName('mock');
		const model = new RelationalModel()
		expect(model).toBeInstanceOf(RelationalModel);
		const result = await model.Statement(query);
		expect(result).toBe(query)
	});
});