# rex framework

A simple Node Library that makes your implementations neat and organized.
```js

//src/app.js
import { API } from "./API/api";
import { Pages, Logger} from "./Controllers/handler";


import { Router } from "rex-framework";

const app = new Router({ templateFolder: 'templates', connectionConfig:'mysql' });


app.Get("/about", Logger.log, Pages.about);
app.Post("/api/profiles", API.getProfile);
app.Get("/", Logger.log, Pages.index);


//www.js
const app = require("./src/app")



const HOST = "127.0.0.1";
/**
 * Get port from environment and store in Express.
 */

const PORT = normalizePort(process.env.PORT || "3000");

/**
 * Create HTTP server.
 */

const server = http.createServer(app.handle);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(PORT, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`)
});


```


