const mysql = require("mysql");
import { QueryResults, Results } from "../global";


/*Implementation to mysql connections socket*/
const pool = mysql.createPool({
	connectionLimit: process.env.MYSQL_POOL,
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USERNAME,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE
});


/**
 * Executes queries. Uses pool connections. Default 10.
 * @async
 * @param {string} query -Provide a valid query. Implementation trusts in you.
*/
export const statement = async (query: string): Promise<Results[]> => {
	return new Promise((resolve, reject) => {
		pool.getConnection(async (err, connection) => {
			if (err) reject(err); // not connected!
			// Use the connection
			connection.query(query, (error, results,_) => {
				connection.release();
				// Handle error after the release.
				if (error) reject(error);
				else resolve(JSON.parse(JSON.stringify(results)));
			});
		});
	});
}
