
const http = require("http");
import { HandlerFunc, Router } from "../index";
const request = require("supertest")
// const chai = require("chai");
// const chaiHttp = require("chai-http");

// const {expect} = chai;
// chai.use(chaiHttp);

const app = new Router({ templateFolder: 'templates' });

const myResponse = ({ user: 1, homeId: 243423 });

async function logger(req, resp, next) {
	console.log(new Date().toISOString(), req.url);
	return next();
}

const about = async (req, res) => {
	return myResponse;
}

app.Get("/about", logger, about);



const server = http.createServer(app.handle);



describe('GET /', () => {
	it('responds with 200', async() => {
		await request(server)
			.get('/about')
			.expect(200)
			.then(res => {
				expect(JSON.parse(res.text)).toEqual(expect.objectContaining(myResponse))
			})
	});
});
