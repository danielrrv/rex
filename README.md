# rex framework

A simple Node Library that makes your implementations neat and organized.
```js

import { API } from "./API/api";
import { Pages, Logger} from "./Controllers/handler";


import { Router } from "rex-framework";

const app = new Router();


app.Get("/about", Logger.log, Pages.about);
app.Post("/api/profiles", API.getProfile);
app.Get("/", Logger.log, Pages.index);

```


