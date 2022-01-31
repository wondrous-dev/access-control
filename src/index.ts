import reduct from "reduct"

import { App } from "./services/App"

require("dotenv").config()
const container = reduct()
const app = container(App)
app.start()
