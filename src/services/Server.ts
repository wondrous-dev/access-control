import Koa from "koa"
import logger from "koa-logger"
import json from "koa-json"
import bodyParser from "koa-bodyparser"

import router from "./Router"

// To consider: add cors?
// const corsOptions = {
// 	origin: [
// 		"http://localhost:5000"
// 		// TODO: add server location
// 	],
// 	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204,
// 	credentials: true
// }

export class Server {
	private app: Koa

	constructor() {
		this.app = new Koa()
		this.app.use(json())
		this.app.use(logger())
		this.app.use(bodyParser())
		this.app.use(router.routes()).use(router.allowedMethods())
	}

	start(): void {
		const port = process.env.PORT || 4005
		this.app.listen({ port }, () => {
			console.log(`Access control server ready at http://localhost:${port}`)
		})
	}
}
