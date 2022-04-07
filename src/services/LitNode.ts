import LitJsSdk from "lit-js-sdk/build/index.node.js";

const litNodeClient = new LitJsSdk.LitNodeClient()
litNodeClient.connect()

export {LitJsSdk, litNodeClient}
