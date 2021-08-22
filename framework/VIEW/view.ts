
const fs = require("fs");
const http = require("http");
const path = require("path");
const Handlebars = require("handlebars");
import { Response } from "express";
import { IRexUserResponse, RedirectResponse } from "../global";
/**
 *Create a html string to send to user.
 * @param {Response} response used to notify Node Web server that requests ends.
 * @param {file} file filepath
*/
export const view = (file: string, status: number, options?: any): IRexUserResponse => {
	/*TODO: Validate that filepath exists. Thanks try catch */
	try {
		/*sync execution.Only use it at the end of the handler execution*/
		const stringHtml = fs.readFileSync(path.resolve(path.join(__dirname, "../../../../", "templates", file)), "utf-8");
		return ({ body: Handlebars.compile(stringHtml)(options), status })
	} catch (error) {
		/*FIXME: Generic error.*/
		throw new Error("No view found. Place views on Templates folder.");
	}
}


class View {



	public render() {

	}



}