
// import {statement} from "./mysql";
import { Results } from "../global";
import { IModel, Constructor } from "../global";
import { Connection } from "./connection";


/**
 * Class represents Relational models
 * @classdesc Manager Models.
 */
export class RelationalModel extends Connection {
	public static Get<U>(Instance: Constructor<U>): U {
		return new Instance();
	}
	/*What it does: States the primary key of the table*/
	protected primaryKey = "id";
	/*What it does: Represents model"s table*/
	protected tableName = "myTable";
	/**
	 * Finds a model instance by primaryKey. If not id returns all records
	 * @async
	 * @param {string?} id primaryKey
	 * @return {Promise<Results[]>}
	*/
	public async Find(id?: string): Promise<Results> {
		/*What it does: returns the entire table records to user.*/
		if (!id)return await super.Statement("select * from " + this.tableName + ";");
		/*Implementation to validate id. It should be integer.*/
		if (!isNaN(+id)) {
			/*Implementation to query. See connection*/
			return await super.Statement("select * from " + this.tableName + " where " + this.primaryKey + " = " + id + ";");
		} else /*TODO: Generic error*/throw new Error("Primary key should be integer");
	}

	/**
	 * Finds a model instance by column of the table, condition and filter value.
	 * @async
	 * @param {string} column column of the table
	 * @param {string} condition operator
	 * @param {string} filter value to determine the condition
	 * @returns {Promise<Results[]>}
	*/
	public async Where(column: string, condition: string, filter: string): Promise<Results> {
		/*TODO:Validates inputs. Prepare default responses.*/
		return await super.Statement("select * from " + this.tableName + " where " + column + condition + filter + ";");
	}

};