import Router from "koa-router"

import litNodeClient from "./LitNode"
const router = new Router()

const BASE_URL = "https://wonderverse.xyz"

router.get("/", async (ctx, next) => {
	ctx.body = { msg: "OK" }
	await next()
})

router.get("/access/provision", async (ctx, next) => {
	const data = ctx.request.body
	if (!data) {
		throw new Error("No data request sent")
	}

	const { accessControlConditions, chain, authSig, orgId, role } = data

	const resourceId = {
		baseUrl: BASE_URL,
		path: "",
		orgId,
		role
	}

	try {
		await litNodeClient.saveSigningCondition({
			accessControlConditions,
			chain,
			authSig,
			resourceId
		})
	} catch (e) {
		throw new Error("Failed to save token gating conditions: " + e)
	}

	ctx.body = {
		success: true
	}

	await next()
})

router.get("/access/request", async (ctx, next) => {
	const data = ctx.request.body
	if (!data) {
		throw new Error("No data request sent")
	}

	const { accessControlConditions, chain, authSig, orgId, role } = data

	const resourceId = {
		baseUrl: BASE_URL,
		path: "",
		orgId,
		role
	}
	try {
		const jwt = await litNodeClient.getSignedToken({
			accessControlConditions,
			chain,
			authSig,
			resourceId
		})
		ctx.body = {
			token: jwt
		}
	} catch (e) {
		throw new Error("Failed to save token gating conditions: " + e)
	}

	await next()
})

export default router
