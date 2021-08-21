
import { Params } from "../../global";


/**
 * Parse uri params based on delimiter
 * @param {string} routeUrl The route defined on routes array. It contains the params required on the url
 * @param {string} requestUrl The request"s url. 
 * @param {Params} params store object
 * @return {Params}
*/
export const parseParams = (routeUrl: string, requestUrl: string, params: Params = {}): Params => {
	/*Delimiter, consider to pass it to  the args function*/
	const delimiter = ":";
	/*try to find  the position of the delimiter*/
	const current = routeUrl.indexOf(delimiter);
	/*Case #. There are delimiter*/
	if (current != -1) {
		/*Implementation to extract  the param from the routeUlr declare on routes*/
		let endRoute = current;
		while ((routeUrl[endRoute] != "/") && (endRoute <= routeUrl.length)) endRoute++;
		/*Implementation to extract the value  of the param from the request url*/
		let endRequest = current;
		while ((requestUrl[endRequest] != "/") && (endRequest <= requestUrl.length)) endRequest++;
		/*Set param as key/value */
		params[routeUrl.slice(current + delimiter.length, endRoute)] = requestUrl.slice(current, endRequest);
		/*Go!*/
		return parseParams(routeUrl.slice(endRoute), requestUrl.slice(endRequest), params);
	} else {
		return params;
	}
}

/**
 * Convert url into regular expression url that allows match routes better 
 * @param {string} url uri url from the user
 * @returns {RegExp|string} 
*/
export const convertToRegexUrl = (url: string): RegExp | string => {
	/*Delimiter, consider to pass it to  the args function*/
	const delimiter = ":";
	/*try to find  the position of the delimiter*/
	const current = url.indexOf(delimiter);
	if (current != -1) {
		/*Implementation to extract  the param from the routeUlr declare on routes*/
		let endRoute = current;
		while ((url[endRoute] != "/") && (endRoute <= url.length)) endRoute++;
		/*What it does: Replaces the param to regex of any character. (.+)matches any char.*/
		url = url.slice(0, current) + ".+" + url.slice(endRoute);
		/*Keep moving!*/
		return convertToRegexUrl(url);
	} else {
		/*What it does: Replaces simple / for escape versions of them. Used as regex.*/
		return url.slice(0, url.length).replace(new RegExp("\\/", "g"), "\\/");
	}
}