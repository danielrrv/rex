import { Response, Request } from "express";
export declare interface Payload {
	Request: Request;

}
/*Implementation to describe Handler functions*/
export type HandlerFunc = (req: Request, res: Response, next?:Function ) => Promise<RedirectResponse> | void;

export declare interface IRoute  {
	path: string;
	handlers: HandlerFunc[];
	method: string;
}
export declare interface IModel {
	Find(id?: string): Promise<QueryResults>;
	Where(column: string, condition: string, filter: string): Promise<QueryResults>;
}

export type Constructor<T = {}> = new (...args: any[]) => T;

export type Results = any;

export type RedirectResponse = void | Response;
export declare interface QueryResults {
	results: any,
	fields: any,
	error: any
}

export declare interface Params {
	[key: string]: string;
}



// export declare interface INoSQL{
// 	[key: string]: string;
// }

// export declare interface NoRelationalModel extends Record<string, string>{
// 	Find(id?:number):NoRelationalModel
// }