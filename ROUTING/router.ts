
"use strict"
// import { HandlerFunc, IRoute, Params, RedirectResponse } from "../global";
import { Response, Request, request, response } from "express";
import {RedirectResponse, HandlerFunc, IRoute, Params} from '../global'
import { convertToRegexUrl,parseParams } from "../index";
import * as url from "url";

/**
 * Handles 404 redirection
 * @param {Request} request
 * @param {Response} response@
 * @return 
 *
*/
export const error404 = async (request: Request, response: Response): Promise<RedirectResponse> => {
   response.statusCode = 404;
   response.write("Error 404. Resource Not found");
   response.end();
};


export class Router {
	private routes?: IRoute[] = [];

	public constructor() {
		this.handle = this.handle.bind(this);
	}
	public handle(req: Request, res: Response, params: Params = {}, route = 0) {

		/*Case #1: Request"s url matches with route and method at position  stated by route on routes array*/
		if (new RegExp(convertToRegexUrl(this.routes[route].path))
			.test(url.parse(req.url, true).pathname) &&
			req.method == this.routes[route].method
		) {
			//Implementation to avoid static files match the root route /. TODO: Move to a function. validRoute?(pathname);
			if(this.routes[route].path=="/" && Array.from(url.parse(req.url, true).pathname).length > "/".length) return error404(req, res);
			/*Implementation to capture query strings*/
			const queryStrings = url.parse(req.url, true).query;
			Object.assign(params, queryStrings);
			/*Implementation to parse params*/
			Object.assign(params, parseParams(this.routes[route].path, req.url));
			/*See you in future ticks->*/
			req.params = params;
			return this.ExecuteMiddleware(req, res, this.routes[route])
		}
		/*Case #2. Keep preaching for routes. */
		if (this.routes.length - 1 > route) {
			return this.handle(req, res, params, route + 1);
		}
		/*Implementation to default router behavior*/
		return error404(req, res);
	}
	public Get(path: string, ...func: HandlerFunc[]) {
		this.routes.push({ path: path, method: "GET", handlers: func });
		return this;
	}
	public Post(path: string, ...func: HandlerFunc[]) {
		this.routes.push({ path: path, method: "POST", handlers: func });
		return this;
	}
	private ExecuteMiddleware(req: Request, resp: Response, route: IRoute) {
		let index = 0
		let len = route.handlers.length
		function next(){
			index++;
			if(index > len){
				//Implementation to execute the last middleware.
				return route.handlers[len - 1](req, resp);
			}
			//Execute the next middleware. Always starts at second middleware.
			return route.handlers[index](req, resp, next)
		}
		//Execute the first middleware of the array.
		return route.handlers[index].call(null, req, resp, next);
	}
}
