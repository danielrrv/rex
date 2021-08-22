# rex

A simple Node Library that make your implementation neat and organized.



```js
import { getProfile } from "./API/api";
import { about, index } from "./Controllers/handler";

import { HandlerFunc } from "../lib/index";
import { Router } from "rex-framework";

const app = new Router();

function logger(req, resp, next){
	console.log(new Date().toISOString(), req.url);
	next();
}

app.Get("/about", logger, about);
app.Post("/api/profiles", getProfile);
app.Get("/", logger, index);

```