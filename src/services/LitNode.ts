import LitJsSdk from "lit-js-sdk/build/index.node.js";

const litNodeClient = new LitJsSdk.LitNodeClient({
    alertWhenUnauthorized: false,
    debug: false
})
litNodeClient.connect()


export {LitJsSdk, litNodeClient}
