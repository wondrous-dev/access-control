import Router from "koa-router";

import { LitJsSdk, litNodeClient } from "./LitNode";
const router = new Router();

router.get("/", async (ctx, next) => {
  ctx.body = { msg: "OK" };
  await next();
});

const DEFAULT_CHAIN = "ethereum";

router.post("/access/provision", async (ctx, next) => {
  const data = ctx.request.body;
  if (!data || Object.keys(data).length == 0) {
    throw new Error("No data was sent in request");
  }
  console.log(
    "received provision request with payload: ",
    JSON.stringify(data)
  );

  const { resourceId, authSig, accessCondition } = data;

  try {
    await litNodeClient.saveSigningCondition({
      accessControlConditions: accessCondition,
      chain: DEFAULT_CHAIN,
      authSig: authSig,
      resourceId: resourceId,
      permanant: false,
    });
  } catch (e) {
    if (e != undefined && (e as any).code === "storage_error") {
      ctx.status = 422;
      ctx.body = {
        success: false,
        message:
          "Failed to save access condition at the provided path since it's been market as immutable: " +
          JSON.stringify(e),
      };
      return await next();
    }
    if (e != undefined) {
      ctx.status = 400;
      ctx.body = {
        success: false,
        message: (e as any).message,
      };
      return await next();
    }
    throw new Error("Failed to save access conditions: " + e);
  }

  ctx.body = {
    success: true,
  };

  await next();
});


router.post("/access/request", async (ctx, next) => {
  const data = ctx.request.body;
  if (!data) {
    throw new Error("No data request sent");
  }

  console.log(
    "received verification request with payload: ",
    JSON.stringify(data)
  );

  const { resourceId, authSig, accessCondition } = data;
  try {
    const jwt = await litNodeClient.getSignedToken({
      accessControlConditions: accessCondition,
      chain: DEFAULT_CHAIN,
      authSig: authSig,
      resourceId: resourceId,
    });
    console.log("Obtained JWT: ", jwt);
    const { verified, header, payload } = LitJsSdk.verifyJwt({ jwt });
    if (
      !verified ||
      payload.baseUrl !== resourceId["baseUrl"] ||
      payload.path !== resourceId["path"] ||
      payload.orgId !== resourceId['orgId'] ||
      payload.extraData !== ""
    ) {
      ctx.status = 403;
      ctx.body = {
        success: false,
        message: "Provided user does not have access to provided path.",
      };
      return await next();
    }
  } catch (e) {
    const errorMessage = (e as Error).message
    ctx.status = 400;
    ctx.body = {
      success: false,
      // Unfortunately if the user doesn't have access, sometimes LIT throws
      // error so it's not always possible to tell the difference between rejection
      // and internal error.
      message:
        "Something went wrong or the provided user does not have access to provided path: " +
        errorMessage,
    };
    return await next();
  }

  ctx.body = {
    success: true,
  };

  await next();
});

export default router;
