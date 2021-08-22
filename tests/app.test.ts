
const http = require("http");
import { HandlerFunc, Router } from "../index";
const supertest = require("supertest")

const app = new Router({ templateFolder: 'templates' });

function logger(req, resp, next) {
	console.log(new Date().toISOString(), req.url);
	return next();
}
const about = (req, res) => {
	return ({ user: 1, homeId: 243423 });
}

app.Get("/about", logger, about);





const server = http.createServer(app.handle);


const request = supertest.agent(server)




describe('GET /', function () {
	it('responds with json', function (done) {
		const result = request(app.handle).get('/about');
		result.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200, done);
	});
});
