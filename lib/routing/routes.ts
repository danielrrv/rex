import { index, error404, show } from "../../src/Controllers/handler";
import { getAllProfile, putProfile, getProfile } from "../../src/API/api";
import { IRoute } from "../types";
/**
 * Consider the following instruction  before declaring routes:
 * Rule #1. Always place the "/" at the end of the array. Algorithm will match any route against it.
 * Rule #2. Resources routes like /api/users and api/users/:id will match and algorithm can tangled trying to parse
 * one instead of the right one. Please place /api/users/:id first always to avoid race conditions.
 * 
*/
const routes: IRoute[] = [

	{
		handlers: [show],
		path: "/users",
		method:"GET"
	},
	{
		handlers:[getProfile],
		path:"/api/profiles/:id",
		method:"GET"
	},
	{
		handlers:[ getAllProfile],
		path:"/api/profiles",
		method:"GET"
	},
	
	{
		handlers:[putProfile],
		path:"/api/profiles",
		method:"POST"
	},
	{
		handlers: [index],
		path: "/",
		method: "GET"
	},
];

export default routes;
