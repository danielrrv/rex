import { Response, Request } from "express";


export interface Options {
	templateFolder: string;
	engine?: string;
	logger?: Logger;
}
export type IRexResponse = Response;
export interface IRexUserResponse {
	body: string | number | object;
	status?: number
}
type Logger = any
export interface Payload {
	Request: Request;

}
/*Implementation to describe Handler functions*/
export type HandlerFunc = (req: Request, res: Response, next?: Function) => any;

export interface IRoute {
	path: string;
	handlers: HandlerFunc[];
	method: string;
}
export interface IModel {
	Find(id?: string): Promise<QueryResults>;
	Where(column: string, condition: string, filter: string): Promise<QueryResults>;
}

export type Constructor<T = {}> = new (...args: any[]) => T;

export type Results = any;

export type RedirectResponse = void | Response;
export interface QueryResults {
	results: any,
	fields: any,
	error: any
}

export interface Params {
	[key: string]: string;
}


