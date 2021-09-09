import { RelationalModel } from '../..';
import { MySQLClient } from '../../framework/Boostrap/Booter'


class User extends RelationalModel {
	public constructor() {
		super(MySQLClient)
	}

}