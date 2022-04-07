import Koa from "koa"
import logger from "koa-logger"
import json from "koa-json"
import bodyParser from "koa-bodyparser"
import mount from "koa-mount"
import serve from "koa-static"

import path from "path"

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
    const ppath = path.join(__dirname, '../', '/static')
    console.log("PATH: " + ppath)
    this.app.use(mount('/public ', serve(ppath)))
		this.app.use(router.routes()).use(router.allowedMethods())
	}

	start(): void {
		const port = process.env.PORT || 5002
		this.app.listen({ port }, () => {
			console.log(`Access control server ready at http://localhost:${port}`)
		})
	}
}
