
const fs = require("fs");
const http = require("http");
const path = require("path");
const Handlebars = require("handlebars");
import { Response } from "express";
import { RedirectResponse } from "../types";
/**
 *Create a html string to send to user.
 * @param {Response} response used to notify Node Web server that requests ends.
 * @param {file} file filepath
*/
export const view = (response: Response, file: string, options?: any): RedirectResponse => {
	/*TODO: Validate that filepath exists. Thanks try catch */
	try {
		/*sync execution.Only use it at the end of the handler execution*/
		const stringHtml = fs.readFileSync(path.resolve(path.join(__dirname, "../../../", "templates", file)), "utf-8");
		response.statusCode = 200;
		response.setHeader("Content-Type", "text/html");
		/*Implementation to write template Html and put it on response*/
		response.write(Handlebars.compile(stringHtml)(options));
		/*Notifies to server that request finished*/
		response.end();
	} catch (error) {
		/*FIXME: Generic error.*/
		throw new Error("No view found. Place views on Templates folder.");
	}
}
