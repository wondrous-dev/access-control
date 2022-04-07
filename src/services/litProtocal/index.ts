import Router from "koa-router";

import { LitJsSdk, litNodeClient } from "../LitNode";
const router = new Router();

const accessCondition = [
  {
    contractAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    standardContractType: "ERC20",
    chain: "ethereum",
    method: "balanceOf",
    parameters: [":userAddress"],
    returnValueTest: { comparator: ">=", value: "1000" },
  },
  { operator: "or" },
  {
    contractAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    standardContractType: "ERC20",
    chain: "ethereum",
    method: "balanceOf",
    parameters: [":userAddress"],
    returnValueTest: { comparator: ">=", value: "1000" },
  },
];
// const authSig = {
//   sig: "",
//   derivedVia: "web3.eth.personal.sign",
//   signedMessage: "lit protocal authorization",
//   address: "",
// };

const authSig = {
  sig: "",
  derivedVia: "web3.eth.personal.sign",
  signedMessage: "hii",
  address: "",
};


const resourceId = {
  baseUrl: "app.wonderverse.xyz",
  path: "/",
  orgId: "51641043825721354",
  role: "51641043843547156",
  extraData: "",
};

async function create() {
  await litNodeClient.connect();
  try {
    await litNodeClient.saveSigningCondition({
      accessControlConditions: accessCondition,
      chain: "ethereum",
      authSig: authSig,
      resourceId: resourceId,
      permanant: false,
    });
  } catch (e) {
    console.error(e);
  }
}

// create();

async function checkAccess() {
  await litNodeClient.connect();
  try {
    await litNodeClient.getSignedToken({
      accessControlConditions: accessCondition,
      chain: "ethereum",
      authSig: authSig,
      resourceId: resourceId,
    });
  } catch (e) {
    console.error(e);
  }
}

checkAccess();
